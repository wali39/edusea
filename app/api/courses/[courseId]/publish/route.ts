import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  _req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const courseId = params.courseId;
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
    if (!course) return new NextResponse("Course not found", { status: 404 });

    const hasPublishedChapter = await db.chapter.findMany({
      where: {
        courseId,
        isPublished: true,
      },
    });
    if (
      !hasPublishedChapter ||
      !course.title ||
      !course.description ||
      !course.categoryId ||
      !course.imageUrl
    ) {
      return new NextResponse("Missing required fields", { status: 401 });
    }

    const publishedCourse = await db.course.update({
      where: {
        id: courseId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(publishedCourse);
  } catch (error) {
    console.log("[COURSEID]/PUBLISH", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
