import { redirect } from "next/navigation";
import Categories from "./_components/categories";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { getCourses } from "@/actions/get-courses";
import CourseList from "./_components/course-list";
import SearchInput from "../../_components/search-input";

interface searchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}
const SearchPage = async ({ searchParams }: searchPageProps) => {
  const { userId } = auth();
  if (!userId) redirect("/");
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const courses = await getCourses({ userId, ...searchParams });

  return (
    <>
      <div className="block md:hidden px-6 pt-6 md:mb-0 ">
        <SearchInput />
      </div>
      <div className="space-y-6 p-6">
        <Categories items={categories} />
        <CourseList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
