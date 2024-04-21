"use client";

import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseProgressButton {
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isCompleted?: boolean;
}
const CourseProgressButton = ({
  courseId,
  chapterId,
  nextChapterId,
  isCompleted,
}: CourseProgressButton) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const Icon = isCompleted ? XCircle : CheckCircle;

  const handleClick = async () => {
    try {
      setIsLoading(true);
      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        { isCompleted: !isCompleted }
      );
      if (!isCompleted && !nextChapterId) {
        confetti.onOpen();
      }
      if (!isCompleted && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }
      router.refresh();
      toast.success("Progress updated");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      onClick={handleClick}
      type="button"
      disabled={isLoading}
      variant={isCompleted ? "outline" : "success"}
    >
      {isCompleted ? "Not complete" : "Mark as complete"}
      <Icon className="h-5 w-5 ml-2 " />
    </Button>
  );
};

export default CourseProgressButton;
