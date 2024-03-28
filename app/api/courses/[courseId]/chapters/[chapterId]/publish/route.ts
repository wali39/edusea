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

    const chapterFindbyId = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    });
    const muxByChapter = await db.muxData.findUnique({
      where: {
        chapterId: params.chapterId,
      },
    });
    if (
      !chapterFindbyId ||
      !muxByChapter ||
      !chapterFindbyId.title ||
      !chapterFindbyId.description ||
      !chapterFindbyId.videoUrl
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }
    const publishedChapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPublished: true,
      },
    });
    return NextResponse.json(publishedChapter);
  } catch (error) {
    console.log("[COURSEID]/PUBLISH", error);
    return new NextResponse(" Interval error", { status: 500 });
  }
}
