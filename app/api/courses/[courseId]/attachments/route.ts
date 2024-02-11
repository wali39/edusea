import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { url, name } = await req.json();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const owner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!owner) return new NextResponse("Unauthorized", { status: 401 });

    const attachment = await db.attachment.create({
      data: {
        url,
        name,
        courseId: params.courseId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("[api/courses/[courseId]/attachments]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

