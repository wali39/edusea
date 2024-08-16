import { getUserProgress } from "@/actions/get-user-progress";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CourseSidebar from "./_components/course-sidebar";
import CourseNavbar from "./_components/course-navbar";

const CourseLayout = async ({
  children,
  params,
}: {
  params: { courseId: string };
  children: React.ReactNode;
}) => {
  const { userId } = auth();
  if (!userId) redirect("/");

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });
  if (!course) redirect("/");
  const progressCount = await getUserProgress(userId, course.id);

  return (
    <div className="h-full">
      <div className="md:pl-80 h-[80px] fixed w-full inset-y-0 z-10">
        <CourseNavbar course={course} progressCount={progressCount} />
      </div>
      <div className="hidden md:flex flex-col w-80 h-full fixed inset-y-0  z-50 ">
        <CourseSidebar course={course} progressCount={progressCount} />
      </div>
      <main className="md:pl-80 pt-[80px] h-full">{children}</main>;
    </div>
  );
};

export default CourseLayout;
