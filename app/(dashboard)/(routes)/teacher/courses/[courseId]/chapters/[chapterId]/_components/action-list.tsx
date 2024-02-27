"use client";

import ConfirmModal from "@/components/modal/confirm-modal";
import { Button } from "@/components/ui/button";
import { Chapter } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ActionListProps {
  courseId: string;
  chapter: Chapter;
  isComplete: boolean;
}

const ActionList = ({ courseId, chapter, isComplete }: ActionListProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const onClick = async () => {
    try {
      setIsLoading(true);
      if (chapter.isPublished) {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapter.id}/unpublish`
        );
        toast.success("Chapter unpublished");
        router.refresh();
      } else {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapter.id}/publish`
        );
        toast.success("Chapter published");
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
      await axios.delete(`/api/courses/${courseId}/chapters/${chapter.id}`);
      toast.success("Chapter deleted");
      router.push(`/teacher/courses/${courseId}`);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="flex gap-x-2">
      <Button variant="outline" disabled={isComplete||isLoading} onClick={onClick}>
        {chapter.isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete} >
        <Button className="text-white" disabled={isLoading}>
          <Trash size={15} />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default ActionList;
