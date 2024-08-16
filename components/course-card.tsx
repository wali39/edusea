"use client";

import { formatPrice } from "@/lib/format";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CourseProgress from "./course-progress";

interface CourseCardProps {
  courseId: string;
  title: string;
  price: number;
  imageUrl: string;
  category: string;
  progress: number;
  chapters: number;
}
const CourseCard = ({
  courseId,
  title,
  price,
  imageUrl,
  category,
  progress,
  chapters,
}: CourseCardProps) => {
  return (
    <Link href={`/courses/${courseId}`}>
      <div className="overflow-hidden border group rounded-lg p-3 h-full bg-lightBackgroundSea  hover:bg-[#4cb89d2a] ">
        <div className="relative w-full  aspect-video rounded-lg overflow-hidden">
          <Image alt={title} src={imageUrl} fill className="object-cover" />
        </div>
        <div className="text-lg font-bold mt-3 text-textSea group-hover:text-teal-900 line-clamp-2">
          {title}
        </div>
        <div className="text-slate-500 text-sm font-semibold">
          {category}
        </div>
        <div className="my-3">
          <div className="flex items-center my-3 gap-2 font-medium">
            <div className="bg-primarySea rounded-full border-2   p-2 text-white">
              <BookOpen size={18} />
            </div>
            <p className="text-textSea text-sm ">
              {chapters} {chapters == 1 ? "Chapter" : "Chapters"}
            </p>
          </div>
          {progress != null ? (
            <CourseProgress variant="success" value={progress} />
          ) : (
            <p className="font-bold text-lg text-textSea">
              {formatPrice(price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
