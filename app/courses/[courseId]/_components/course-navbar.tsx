import NavbarRoutes from "@/components/navbar-routes";
import { Course, Chapter, UserProgress } from "@prisma/client";
import CourseMobileNavbar from "./course-mobile-navbar";

interface courseNavbarProps {
  course: Course & {
    chapters: (Chapter & { userProgress: UserProgress[] | null })[];
  };
  progressCount: number;
}

const CourseNavbar = ({ course, progressCount }: courseNavbarProps) => {
  return (
    <div className="p-4 flex h-full  shadow-sm shadow-lightBackgroundSea bg-backgroundSea  justify-center border-b z-50">
      <CourseMobileNavbar course={course} progressCount={progressCount} />
      <NavbarRoutes />
    </div>
  );
};

export default CourseNavbar;
