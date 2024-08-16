import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { AlertTriangleIcon, CheckCircleIcon,  } from "lucide-react";

const variantProps = cva("w-full p-4  text-sm  flex items-center gap-2 mt-1", {
  variants: {
    variant: {
      warning: "bg-yellow-300/80 text-primary",
      success: "bg-primarySea text-white",
    },
    defaultVariants: {
      variant: "warning",
    },
  },
});
interface BannerProps extends VariantProps<typeof variantProps> {
  label: string;
}
const iconMap = {
  warning: AlertTriangleIcon,
  success: CheckCircleIcon,
};
const Banner = ({ variant, label }: BannerProps) => {
  const Icon = iconMap[variant || "warning"];

  return (
    <div className={cn(variantProps({variant}))}>
      <Icon size={20} />
      {label}
    </div>
  );
};

export default Banner;
