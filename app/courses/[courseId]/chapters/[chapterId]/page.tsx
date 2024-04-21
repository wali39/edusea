import { getChapter } from "@/actions/get-chapter";
import Banner from "@/components/banner";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import VideoPlayer from "./_components/video-player";
import CourseEnrollButton from "./_components/course-enroll-button";
import Preview from "@/components/preview";
import { Separator } from "@/components/ui/separator";
import { File } from "lucide-react";
import CourseProgressButton from "./_components/course-progress-button";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) redirect("/");

  const {
    course,
    chapter,
    muxData,
    nextChapter,
    purchase,
    userProgress,
    attachments,
  } = await getChapter({
    userId,
    courseId: params.courseId,
    chapterId: params.chapterId,
  });

  if (!chapter && !course) redirect("/");
  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isComplete;

  return (
    <div>
      {isLocked && (
        <Banner
          variant={"warning"}
          label="You need to purchase to watch the video"
        />
      )}
      {userProgress?.isComplete && (
        <Banner
          variant={"success"}
          label="You have already watched this video"
        />
      )}
      <div className="flex flex-col max-w-4xl pb-30">
        <div className="p-2">
          <VideoPlayer
            chapterId={params.chapterId}
            courseId={params.courseId}
            title={chapter.title}
            playbackId={muxData?.playbackId!}
            nextChapterId={nextChapter?.id}
            isLocked={isLocked}
            isComplete={completeOnEnd}
          />
        </div>

        <div className="p-4 flex flex-col  items-center  md:flex-row justify-between">
          <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
          {purchase ? (
            <CourseProgressButton
              courseId={params.courseId}
              chapterId={params.chapterId}
              nextChapterId={nextChapter?.id}
              isCompleted={!!userProgress?.isComplete}
            />
          ) : (
            <CourseEnrollButton
              price={course.price!}
              courseId={params.courseId}
            />
          )}
        </div>

        <Separator />
        <div>
          <Preview value={chapter.description!} />
        </div>
        {!!attachments.length && (
          <>
            <Separator />
            {attachments.map((attachment) => (
              <div className="p-4" key={attachment.id}>
                <a
                  href={attachment.url}
                  target="_blank"
                  className="flex border p-2  w-full bg-slate-300 
                  rounded-md
                  items-center hover:underline"
                >
                  <File />
                  <p className="line-clamp-1">{attachment.name}</p>
                </a>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ChapterIdPage;
