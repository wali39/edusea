"use client";

import { Category, Course } from "@prisma/client";
import CourseCard from "./cours-card";
type courseWithProgress = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface CourseListProps {
  items: courseWithProgress[];
}
const CourseList = ({ items: courses }: CourseListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-4 ">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            courseId={course.id}
            title={course.title}
            chapters={course.chapters.length}
            progress={course.progress!}
            imageUrl={course.imageUrl!}
            price={course.price!}
            category={course.category?.name!}
          />
        ))}
      </div>
      <div className="text-md font-bold text-muted-foreground text-center h-full mt-10">
        {courses.length == 0 && "No course found"}
      </div>
    </div>
  );
};

export default CourseList;
