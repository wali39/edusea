"use client";

import ConfirmModal from "@/components/modal/confirm-modal";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { Chapter } from "@prisma/client";
import axios from "axios";
import { BookCheck, BookKey, Trash, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ActionListProps {
  courseId: string;
  isPublished: boolean;
  isComplete: boolean;
}

const ActionList = ({ courseId, isComplete, isPublished }: ActionListProps) => {
  const confettiControl = useConfettiStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const onClick = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success("Course unpublished");
        router.refresh();
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success("Course published");
        confettiControl.onOpen();
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}`);
      toast.success("Chapter deleted");
      router.refresh();
      router.push(`/teacher/courses`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex gap-2">
      <Button
        className="bg-primarySea hover:bg-teal-600 "
        disabled={isComplete || isLoading}
        onClick={onClick}
      >
        {isPublished ? (
          <p className="flex gap-x-1">
            <span>Unpublish</span>{" "}
            <span>
              <BookKey size={18} />
            </span>
          </p>
        ) : (
          <p className="flex gap-x-1">
            <span>Publish</span>{" "}
            <span>
              <BookCheck size={18} />
            </span>
          </p>
        )}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button
          variant="destructive"
          className="text-white flex gap-x-1"
          disabled={isLoading}
        >
          <span>Delete</span> <Trash2 size={18} />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default ActionList;
