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
    });

    if (!course) return new NextResponse("Course not found", { status: 404 });

    const unpublishedCourse = await db.course.update({
      where: {
        id: courseId,
      },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json(unpublishedCourse);
  } catch (error) {
    console.log("[COURSEID]/UNPUBLISH", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
