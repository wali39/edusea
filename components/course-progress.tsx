import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";

interface CourseProgressProps {
  value: number;
  variant?: "default" | "success";
  size?: "default" | "sm";
}
const colorByVariant = {
  default: "text-sky-700",
  success: "text-teal-800",
};
const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
};

const CourseProgress = ({ value, variant, size }: CourseProgressProps) => {
  return (
    <div>
      <Progress className="h-3" value={value} variant={variant} />
      <p
        className={cn(
          "font-semibold mt-2 text-sky-700",
          colorByVariant[variant || "default"],
          sizeByVariant[size || "default"]
        )}
      >
        {Math.round(value)}% Complete
      </p>
    </div>
  );
};

export default CourseProgress;
