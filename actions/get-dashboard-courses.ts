import { getUserProgress } from "@/actions/get-user-progress";
import { db } from "@/lib/db";
import { Category, Chapter, Course } from "@prisma/client";

type CourseWithProgressWithCategory = Course & {
  category: Category;
  chapters: Chapter[];
  progress: number | null;
};

type DashboardCourses = {
  completedCourses: any[];
  courseInProgress: any[];
};
const GetDashboardCourses = async (
  userId: string
): Promise<DashboardCourses> => {
  try {
    const purchasedCourses = await db.purchase.findMany({
      where: {
        userId: userId,
      },
      select: {
        course: {
          include: {
            category: true,
            chapters: {
              where: {
                isPublished: true,
              },
            },
          },
        },
      },
    });
    const courses = (await purchasedCourses.map(
      (purchases) => purchases.course
    )) as CourseWithProgressWithCategory[];
    for (let course of courses) {
      const progress = await getUserProgress(userId, course.id);
      course["progress"] = progress;
    }
    const completedCourses = courses.filter((course) => course.progress == 100);
    const courseInProgress = courses.filter(
      (course) => (course.progress ?? 0) < 100
    );
    return {
      completedCourses,
      courseInProgress,
    };
  } catch (error) {
    console.log("GET_DASHBOARD_COURSES", error);
    return {
      completedCourses: [],
      courseInProgress: [],
    };
  }
};

export default GetDashboardCourses;
