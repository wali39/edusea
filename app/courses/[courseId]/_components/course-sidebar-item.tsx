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
      className={cn(
        "flex  gap-x-2 items-center text-slate-500 text-sm pl-6 font-[500] hover:text-slate-600 hover:bg-slate-200/20",
        isActive &&
          "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
        isComplete && "text-emerald-700 hover:text-emerald-700",
        isComplete && isActive && "bg-emerald-200/20"
      )}
      type="button"
    >
      <div className="flex items-center gap-x-2 py-4 ">
        <Icon
          size="20"
          className={cn(
            "text-slate-500",
            isActive && "text-slate-700",
            isComplete && "text-emerald-700"
          )}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto border-2 opacity-0 border-slate-700 h-full transition-all",
          isActive && "opacity-100",
          isComplete && "border-emerald-700"
        )}
      />
    </button>
  );
};

export default CourseSidebarItem;
