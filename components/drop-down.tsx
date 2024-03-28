import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Loader2Icon, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

import { useState } from "react";
import { useRouter } from "next/navigation";

const DropDown = ({ courseId }: { courseId: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = () => {
    try {
      setIsLoading(true);
      router.push(`/teacher/courses/${courseId}`);
    } catch (error) {
    } finally {
    }
  };
  return (
    <>
      {isLoading && <Loader2Icon className="animate-spin" size={20} />}
      {!isLoading && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleClick}>
              <Edit size={15} className="mr-2" /> Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default DropDown;
