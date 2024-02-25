import { db } from "@/lib/db";

export const getUserProgress = async (
  userId: string,
  courseId: string
): Promise<number> => {
  try {
    const allChapters = await db.chapter.findMany({
      where: {
        courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });
    const chaptersId = allChapters.map((chapter) => chapter.id);
    const completedChapter = await db.userProgress.count({
      where: {
        userId,
        chapterId: {
          in: chaptersId,
        },
        isComplete: true,
      },
    });
    const progressInPercentage = (completedChapter / allChapters.length) * 100;

    return progressInPercentage;
  } catch (error) {
    console.log("[GET_USER_PROGRESS]", error);
    return 0;
  }
};
