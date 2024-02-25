import { db } from "@/lib/db";
import { Category, Course } from "@prisma/client";
import { getUserProgress } from "./get-user-progress";

type courseWithProgress = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

type getCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getCourses = async ({
  userId,
  title,
  categoryId,
}: getCourses): Promise<courseWithProgress[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchases: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const courseWithProgress: courseWithProgress[] = await Promise.all(
      courses.map(async (course) => {
        if (course.purchases.length == 0) {
          return {
            ...course,
            progress: null,
          };
        }

        const userProgress = await getUserProgress(course.id, userId);
        return {
          ...course,
          progress: userProgress,
        };
      })
    );

    return courseWithProgress;
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
};
