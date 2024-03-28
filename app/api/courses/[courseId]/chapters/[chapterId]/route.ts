import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { isPublished, ...values } = await req.json();

    const { video } = new Mux({
      tokenId: process.env["MUX_TOKEN_ID"],
      tokenSecret: process.env["MUX_TOKEN_SECRET"],
    });

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const IsCourseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });
    if (!IsCourseOwner)
      return new NextResponse("Unauthorized", { status: 401 });

    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...values,
      },
    });

    if (values.videoUrl) {
      const ExistingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      });
      if (ExistingMuxData) {
        await video.assets.delete(ExistingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: ExistingMuxData.id,
          },
        });
      }
      const asset = await video.assets.create({
        input: values.videoUrl,
        playback_policy: ["public"],
        test: false,
      });
      if (asset.playback_ids?.[0]?.id) {
        await db.muxData.create({
          data: {
            chapterId: params.chapterId,
            assetId: asset.id,
            playbackId: asset.playback_ids?.[0]?.id,
          },
        });
      }
    }
    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[/chapters/[chapterId]]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    const { video } = new Mux({
      tokenId: process.env["MUX_TOKEN_ID"],
      tokenSecret: process.env["MUX_TOKEN_SECRET"],
    });

    const IsCourseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!IsCourseOwner)
      return new NextResponse("Unauthorized", { status: 401 });
    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    });
    if (!chapter) return new NextResponse("Invalid chapterId", { status: 401 });
    if (chapter.videoUrl) {
      const ExistingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      });
      if (ExistingMuxData) {
        await video.assets.delete(ExistingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: ExistingMuxData.id,
          },
        });
      }
    }
    const chapterDeleted = await db.chapter.delete({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    });
    const coursePublishedChapters = await db.course.findMany({
      where: {
        id: params.courseId,
        isPublished: true,
      },
    });
    if (!coursePublishedChapters.length) {
      await db.course.update({
        where: {
          id: params.courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }
    return NextResponse.json(chapterDeleted);
  } catch (error) {
    console.log("[/chapters/[chapterId]] delete", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
