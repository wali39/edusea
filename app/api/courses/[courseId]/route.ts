import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import Mux from "@mux/mux-node";

import { db } from "@/lib/db";

export async function DELETE(
  _req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const courseId = params.courseId;
    const { video } = new Mux({
      tokenId: process.env["MUX_TOKEN_ID"],
      tokenSecret: process.env["MUX_TOKEN_SECRET"],
    });

    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) return new NextResponse("course not found", { status: 404 });

    for (const chapter of course.chapters) {
      if (chapter.muxData?.assetId) {
        await video.assets.delete(chapter.muxData.assetId);
      }
    }

    const deletedCourse = await db.course.delete({
      where: {
        id: courseId,
      },
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("COURSES/[COURSEID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const courseId = params.courseId;
    const { userId } = auth();
    const values = await req.json();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const course = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(course);
  } catch (error) {
    console.log("[api/course/[courseId]]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
