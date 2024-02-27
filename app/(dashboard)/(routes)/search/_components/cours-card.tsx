"use client";

import { formatPrice } from "@/lib/format";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
      <div className="overflow-hidden border group rounded-lg p-3 h-full ">
        <div className="relative  aspect-video rounded-lg overflow-hidden">
          <Image alt={title} src={imageUrl} fill className="object-cover" />
        </div>
        <div className="text-xl font-bold mt-3 group-hover:text-sky-500">
          {title}
        </div>
        <div className="text-muted-foreground text-sm font-semibold">
          {category}
        </div>
        <div className="my-3">
          <div className="flex items-center my-3 gap-2 font-medium">
            <div className="bg-slate-400 rounded-full p-2 text-slate-200">
              <BookOpen size={20} />
            </div>
            <p className="text-muted-foreground">
              {chapters} {chapters == 1 ? "Chapter" : "Chapters"}
            </p>
          </div>
          <p className="font-bold text-lg">{formatPrice(price)}</p>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
