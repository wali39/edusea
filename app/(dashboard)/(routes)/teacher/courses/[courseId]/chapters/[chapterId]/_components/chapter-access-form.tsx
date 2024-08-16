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

import { Chapter } from "@prisma/client";
import { Edit, EyeIcon, EyeOff, XSquare } from "lucide-react";
import { useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  isFree: z.boolean(),
});

interface ChapterAccessprops {
  chapter: Chapter;
  courseId: string;
  chapterId: string;
}

const ChapterAccess = ({
  chapter,
  courseId,
  chapterId,
}: ChapterAccessprops) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: Boolean(chapter.isFree),
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );

      toast.success("chapter access  updated.");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong.");
      console.log("something went wrong.");
    }
  };
  return (
    <div className="bg-lightBackgroundSea p-4 rounded-md mt-8">
      <div className="flex  justify-between py-2">
        <h4 className="font-medium text-lg">Chapter access</h4>
        <h4
          onClick={toggleEdit}
          className="flex gap-x-1 items-center font-medium text-lg tracking-tight cursor-pointer"
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                {isEditing ? <XSquare size={20} /> : <Edit size={20} />}
              </TooltipTrigger>
              <TooltipContent>
                {isEditing ? <p>cancel</p> : <p>Edit description</p>}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </h4>
      </div>
      {/* <p>{chapter.description}</p> */}
      {!isEditing ? (
        !chapter.isFree ? (
          <p className="bg-slate-300   rounded-lg p-2 flex gap-x-2">
            <EyeOff />
            <span>This chapter is not free for preview</span>
          </p>
        ) : (
          <p className="bg-secondarySea  rounded-lg p-2 flex gap-x-2">
            <EyeIcon />
            <span>This chapter is free for preview</span>
          </p>
        )
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4 "
          >
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 space-y-0 ">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <p>Check this box to make it free for preview</p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              type="submit"
              className="py-2 px-4 bg-[#afd6eb63] hover:bg-[#4fb49b3b]
               text-textSea rounded-md
               disabled:text-white  disabled:cursor-not-allowed"
              disabled={isSubmitting || !isValid}
            >
              save
            </button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ChapterAccess;
