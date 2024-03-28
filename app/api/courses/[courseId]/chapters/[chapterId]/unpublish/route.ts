import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const IsCourseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });
    if (!IsCourseOwner)
      return new NextResponse("Unauthorized", { status: 401 });

    const UnpublishChapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPublished: false,
      },
    });

    const cousePublishedChapters = await db.chapter.findMany({
      where: {
        id: params.courseId,
        isPublished: true,
      },
    });
    if (!cousePublishedChapters.length) {
      await db.course.update({
        where: {
          id: params.courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }
    return NextResponse.json(UnpublishChapter);
  } catch (error) {
    console.log("[CHAPTERID]/UNPUBLISH", error);
    return new NextResponse(" Internal error", { status: 500 });
  }
}
