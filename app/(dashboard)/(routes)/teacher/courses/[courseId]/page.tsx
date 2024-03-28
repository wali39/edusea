import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import { CourseImageForm } from "./_components/course-image-form";
import CategoryForm from "./_components/category-form";
import PriceForm from "./_components/price-form";
import { AttachmentForm } from "./_components/attachment-form";
import ChapterForm from "./_components/chapter-form";
import ActionList from "./_components/course-action-list";
import Banner from "@/components/banner";

const CoursePage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();
  if (!userId) redirect("/");
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId,
    },
    include: {
      chapters: {
        orderBy: {
          createdAt: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  if (!course) return redirect("/");

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.some((chapter) => chapter?.isPublished == true),
  ];
  const completedFields = requiredFields.filter(Boolean).length;
  const fieldText = `${completedFields}/${requiredFields.length}`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!course.isPublished ? (
        <Banner
          variant="warning"
          label="This course is not published. It will not be visible to the students"
        />
      ) : (
        <Banner
          variant="success"
          label="This course is  published. It will  be visible to the students"
        />
      )}
      <div className="p-6">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-medium tracking-tight">
              Course setup
            </h1>
            <span className="text-md font-sm text-slate-500">
              Complete all fields {fieldText}
            </span>
          </div>
          <div>
            <ActionList
              isComplete={!isComplete}
              isPublished={course.isPublished}
              courseId={course.id}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6  ">
          <div className="space-y-6">
            <div className="flex flex-row gap-x-2  items-center mt-10">
              <div className="bg-slate-200 text-slate-800 p-2 rounded-full">
                <LayoutDashboard />
              </div>
              <h2 className="text-xl font-medium ">Customize your course</h2>
            </div>

            <TitleForm course={course} courseId={course.id} />
            <DescriptionForm course={course} courseId={course.id} />
            <CourseImageForm initialData={course} courseId={course.id} />
            <CategoryForm
              course={course}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex flex-row gap-x-2  items-center mt-10">
                <div className="bg-slate-200 font-bolder text-slate-800 p-2 rounded-full">
                  <ListChecks />
                </div>
                <h2 className="text-xl font-medium ">Course chapters</h2>
              </div>
              <ChapterForm course={course} courseId={course.id} />
            </div>
            <div>
              <div className="flex flex-row gap-x-2  items-center mt-10">
                <div className="bg-slate-200 font-bolder text-slate-800 p-2 rounded-full">
                  <CircleDollarSign />
                </div>
                <h2 className="text-xl font-medium ">Sell your course</h2>
              </div>

              <PriceForm course={course} courseId={course.id} />
            </div>
            <div>
              <div className="flex flex-row gap-x-2  items-center mt-10">
                <div className="bg-slate-200 font-bolder text-slate-800 p-2 rounded-full">
                  <File />
                </div>
                <h2 className="text-xl font-medium ">
                  Resources & Attachments
                </h2>
              </div>
              <AttachmentForm initialData={course} courseId={course.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursePage;
