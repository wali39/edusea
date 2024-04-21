import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      isPublished: true,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
      },
    },
  });
  if (!course) redirect("/");
  return redirect(
    `/courses/${params.courseId}/chapters/${course.chapters[0].id}`
  );
};

export default CourseIdPage;
