import { db } from "@/lib/db";
import { Course, Purchase } from "@prisma/client";

type PurchaseWithCourse = Purchase & {
  course: Course;
};

const groupedByCourse = (purchases: PurchaseWithCourse[]) => {
  const grouped: { [courseTitle: string]: number } = {};

  purchases.map((purchase) => {
    const courseTitle = purchase.course.title;
    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }
    grouped[courseTitle] += purchase.course.price!;
  });

  //   console.log("grouped:", grouped);

  return grouped;
};

export const getAnalytics = async (userId: string) => {
  try {
    const purchases = await db.purchase.findMany({
      include: {
        course: true,
      },
    });

    const filterPurchases = purchases.filter(
      (purchase) => purchase.course.userId == userId
    );
    const groupedEarning = groupedByCourse(filterPurchases);

    const data = Object.entries(groupedEarning).map(([courseTitle, total]) => ({
      name: courseTitle,
      total: total,
    }));
    const totalRevenues = data.reduce((acc, curr) => acc + curr.total, 0);

    const totalSales = filterPurchases.length;

    return {
      data,
      totalRevenues,
      totalSales,
    };
  } catch (error) {
    console.log("GET_ANALYTICS", error);
    return {
      data: [],
      totalRevenues: 0,
      totalSales: 0,
    };
  }
};
