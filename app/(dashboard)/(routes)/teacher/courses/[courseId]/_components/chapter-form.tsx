"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Chapter, Course } from "@prisma/client";
import { Loader2, PlusCircle, XSquare } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import ChapterList from "./chapter-list";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "chapter title is required.",
  }),
});

interface ChapterFormProps {
  course: Course & { chapters: Chapter[] };
  courseId: string;
}

const ChapterForm = ({ course, courseId }: ChapterFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const [isCreating, setisCreating] = useState(false);
  const [isReordering, setIsReordering] = useState(false);

  const toggleCreating = () => setisCreating((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values);

      toast.success("Chapter updated.");
      toggleCreating();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong.");
      console.log("something went wrong.");
    }
  };
  const onReorder = async (
    updatedChapters: { id: string; position: number }[]
  ) => {
    try {
      setIsReordering(true);
      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
        list: updatedChapters,
      });
      toast.success("Chapters reordered.");
    } catch (error) {
      toast.error("something went wrong.");
    } finally {
      setIsReordering(false);
    }
  };
  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${id}`);
  };
  return (
    <div className="relative bg-slate-200 p-4 rounded-md mt-8">
      {isReordering && (
        <div className="absolute h-full w-full top-0 right-0 rounded-md flex items-center bg-slate-500/20 justify-center">
          <Loader2 className="animate-spin" />
        </div>
      )}
      <div className="flex  justify-between py-2">
        <h4 className="font-medium text-lg">Course chapters</h4>
        <h4
          onClick={toggleCreating}
          className="flex gap-x-1 items-center font-medium text-lg tracking-tight cursor-pointer"
        >
          {isCreating ? (
            <XSquare size={20} />
          ) : (
            <div className="flex items-center justify-center gap-2 text-sm ">
              <PlusCircle size={20} /> add chapter
            </div>
          )}
        </h4>
      </div>

      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4 "
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g.'Introduction' "
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              type="submit"
              className="py-2 px-4 bg-slate-500 text-white hover:bg-slate-400 rounded-md disabled:bg-slate-300 disabled:cursor-not-allowed"
              disabled={isSubmitting || !isValid}
            >
              create
            </button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mb-2",
            !course.chapters.length && "text-slate-500 italic"
          )}
        >
          {!course.chapters.length && "No chapters"}
          <ChapterList
            OnEdit={onEdit}
            onReorder={onReorder}
            chapters={course.chapters || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-slate-500 text-sm">Drag to change chapter order</p>
      )}
    </div>
  );
};

export default ChapterForm;
