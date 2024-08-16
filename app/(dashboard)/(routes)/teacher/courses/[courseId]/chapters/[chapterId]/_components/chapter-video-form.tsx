"use client";

import * as z from "zod";
import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { Pencil, PlusCircle, VideoIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

interface ChapterVideoProps {
  chapter: Chapter & { muxData: MuxData | null };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

export const ChapterVideo = ({
  chapter,
  courseId,
  chapterId,
}: ChapterVideoProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("chapter video updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-lightBackgroundSea rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter Video
        <Button onClick={toggleEdit} variant="link">
          {isEditing && <>Cancel</>}
          {!isEditing && !chapter.videoUrl && (
            <p className="flex gap-x-2">
              <PlusCircle size={20} className="text-teal-900" />
              <p> Add an video</p>
            </p>
          )}
          {!isEditing && chapter.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!chapter.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-[#4fb49b3b] rounded-md">
            <VideoIcon className="h-10 w-10 " />
          </div>
        ) : (
          <div className="relative aspect-video  mt-2">
            <MuxPlayer playbackId={chapter.muxData?.playbackId} />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            upload this chapter&apos;s video
          </div>
        </div>
      )}
      {chapter.videoUrl && !isEditing && (
        <div className="text-xs border-t border-gray-400">
          Videos can take few minutes to process. Refresh the page if video is
          not appear
        </div>
      )}
    </div>
  );
};
