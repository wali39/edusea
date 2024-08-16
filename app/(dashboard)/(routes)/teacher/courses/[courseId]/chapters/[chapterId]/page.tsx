import { db } from "@/lib/db";
import ChapterTitleForm from "./_components/chapter-title-form";
import { redirect } from "next/navigation";
import { EyeIcon, LayoutDashboard, MoveLeft, Video } from "lucide-react";
import Link from "next/link";
import ChapterDescription from "./_components/chapter-description-form";
import ChapterAccess from "./_components/chapter-access-form";
import { ChapterVideo } from "./_components/chapter-video-form";
import ActionList from "./_components/action-list";
import Banner from "@/components/banner";

interface ChapterPageProps {
  params: { chapterId: string; courseId: string };
}

const ChapterPage = async ({ params }: ChapterPageProps) => {
  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  });
  if (!chapter) return redirect("/");

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];
  const totalfields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `${completedFields}/${totalfields}`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!chapter.isPublished ? (
        <Banner
          variant="warning"
          label="This chapter is not published. It will not visible in the course"
        />
      ) : (
        <Banner
          variant="success"
          label="This chapter is  published. It will be visible in the course"
        />
      )}
      <div className="p-4">
        <Link
          href={`/teacher/courses/${params.courseId}`}
          className="flex items-center gap-2"
        >
          <MoveLeft size={20} />
          <span>Back to course setup</span>
        </Link>
        <div className="flex justify-between mb-12 mt-6">
          <div>
            <h1 className="text-xl font-bold">Chapter Creation</h1>
            <p>complete all fields {completionText}</p>
          </div>
          <ActionList
            chapter={chapter}
            courseId={params.courseId}
            isComplete={!isComplete}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="text-xl font-medium flex items-center gap-2">
              <span className="bg-primarySea text-white rounded-full p-2">
                <LayoutDashboard />
              </span>
              <span> Customize your chapter</span>
            </div>
            <ChapterTitleForm
              chapter={chapter}
              chapterId={chapter?.id}
              courseId={params.courseId}
            />

            <ChapterDescription
              chapter={chapter}
              chapterId={chapter.id}
              courseId={params.courseId}
            />

            <div className="mt-4">
              <div className="text-xl font-medium flex items-center gap-2">
                <span className="bg-primarySea text-white rounded-full p-2">
                  <EyeIcon />
                </span>
                <span> Access Settings</span>
              </div>
              <ChapterAccess
                chapter={chapter}
                chapterId={chapter.id}
                courseId={params.courseId}
              />
            </div>
          </div>
          {/* video section */}

          <div>
            <div className="text-xl font-medium flex items-center gap-2">
              <span className="bg-primarySea text-white rounded-full p-2">
                <Video />
              </span>
              <span> Add a video</span>
            </div>
            <ChapterVideo
              chapter={chapter}
              chapterId={chapter?.id}
              courseId={params.courseId}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterPage;
