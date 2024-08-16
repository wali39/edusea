"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface CourseSidebarItemProps {
  id: string;
  label: string;
  courseId: string;
  isLocked: boolean;
  isComplete: boolean;
}

const CourseSidebarItem = ({
  id,
  label,
  courseId,
  isLocked,
  isComplete,
}: CourseSidebarItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const Icon = isLocked ? Lock : isComplete ? CheckCircle : PlayCircle;
  const isActive = pathname.includes(id);

  const handleClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };
  return (
    <button
      onClick={handleClick}
      // hover:bg-[#afd6eb63]
      className={cn(
        "flex rounded-sm mx-1 mt-1 gap-x-2 items-center text-textSea text-sm pl-6 font-[500]  ",
        isActive && "text-slate-700 bg-[#afd6eb63]  ",
        isComplete && "text-emerald-700 hover:text-emerald-700",
        isComplete &&
          isActive &&
          "bg-lightBackgroundSea hover:bg-lightBackgroundSea"
      )}
      type="button"
    >
      <div className="flex items-center gap-x-2 py-4 ">
        <Icon
          size="20"
          className={cn(
            "text-slate-600",
            isActive && "text-slate-700",
            isComplete && "text-emerald-700"
          )}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto border-2 opacity-0 border-slate-500 h-full transition-all",
          isActive && "opacity-80",
          isComplete && "border-teal-600"
        )}
      />
    </button>
  );
};

export default CourseSidebarItem;
