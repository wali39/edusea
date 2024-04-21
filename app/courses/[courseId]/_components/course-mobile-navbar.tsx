import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import CourseSidebar from "./course-sidebar";
import { Chapter, Course, UserProgress } from "@prisma/client";

interface CourseMobileNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CourseMobileNavbar = ({
  course,
  progressCount,
}: CourseMobileNavbarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="hover:opacity-50 transition md:hidden pr-4">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left"className="p-0 w-72">
        <CourseSidebar course={course} progressCount={progressCount} />
      </SheetContent>
    </Sheet>
  );
};

export default CourseMobileNavbar;
