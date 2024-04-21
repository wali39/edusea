"use client";

import { useConfettiStore } from "@/hooks/use-confetti-store";
import { cn } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react";
import axios from "axios";
import { Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface videoPlayerProps {
  chapterId: string;
  courseId: string;
  title: string;
  nextChapterId?: string;
  playbackId: string;
  isLocked: boolean;
  isComplete: boolean;
}
const VideoPlayer = ({
  chapterId,
  courseId,
  title,
  nextChapterId,
  playbackId,
  isLocked,
  isComplete,
}: videoPlayerProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();

  const [videoReady, setVideoReady] = useState(false);

  const handleVideoEnd = async () => {
    try {
      if (isComplete) {
        await axios.put(
          `/api/courses/${courseId}/chapters/${chapterId}/progress`,
          { isComplete: true }
        );
      }
      if (!nextChapterId) {
        confetti.onOpen();
      }
      toast.success("Progress updated");
      router.refresh();
      if (nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }
    } catch (error) {
      toast.error("Seomthing went wrong");
    }
  };
  return (
    <div className="relative aspect-video">
      {!videoReady && !isLocked && (
        <div className="absolute inset-0 flex justify-center  items-center bg-slate-900  ">
          <Loader2 className="animate-spin text-white h-8 w-8 " />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex flex-col gap-y-2 justify-center  items-center bg-slate-900  ">
          <Lock className="text-white h-8 w-8 " />
          <p className="text-white">This chapter is locked</p>
        </div>
      )}
      {!isLocked && (
        <MuxPlayer
          className={cn(!videoReady && "hidden")}
          title={title}
          onCanPlay={() => setVideoReady(true)}
          playbackId={playbackId}
          onEnded={handleVideoEnd}
          autoPlay
        />
      )}
    </div>
  );
};

export default VideoPlayer;
