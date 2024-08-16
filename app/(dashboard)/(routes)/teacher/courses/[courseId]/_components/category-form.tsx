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

import { Course } from "@prisma/client";
import { Edit, XSquare } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Combobox } from "@/components/ui/combobox";

const formSchema = z.object({
  categoryId: z.string().min(1, {
    message: "category  is required.",
  }),
});

interface CategoryFormProps {
  course: Course;
  courseId: string;
  options: { label: string; value: string }[];
}

const CategoryForm = ({ course, courseId, options }: CategoryFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: course.categoryId || "",
    },
  });
  const selectedOption = options.find(
    (option) => option.value == course.categoryId
  );
  const { isSubmitting, isValid } = form.formState;

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);

      toast.success("Course description updated.");
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
        <h4 className="font-medium text-lg">Course category</h4>
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
      {/* <p>{course.description}</p> */}
      {!isEditing ? (
        !course.categoryId ? (
          <p className="italic"> no category</p>
        ) : (
          <p>{selectedOption?.label}</p>
        )
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4 "
          >
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox options={options} {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              type="submit"
              className="py-2 px-4 bg-[#afd6eb63] hover:bg-[#4fb49b3b]
               text-textSea rounded-md
               disabled:text-white   disabled:cursor-not-allowed"
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

export default CategoryForm;
