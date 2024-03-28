import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { list } = await req.json();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });
    if (!courseOwner)
      return new NextResponse("Unauthenticated", { status: 403 });

    for (let item of list) {
      await db.chapter.update({
        where: { id: item.id },
        data: { position: item.position },
      });
    }

    return NextResponse.json({ msg: "success", status: 200 });
  } catch (error) {
    console.log("[API/COURSES/[COURSEID]/CHAPTERS/REORDER]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
