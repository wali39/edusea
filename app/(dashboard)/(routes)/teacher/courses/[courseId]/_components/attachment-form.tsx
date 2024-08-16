"use client";

import * as z from "zod";
import axios from "axios";
import {
  PlusCircle,
  File,
  CrossIcon,
  Delete,
  XSquare,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1, {
    message: "url is required",
  }),
  name: z.string().min(1),
});

export const AttachmentForm = ({
  initialData,
  courseId,
}: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);

      toast.success("Attachment updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const [deleteid, setDeleteid] = useState<string | null>(null);
  const handleDelete = async (attachmentId: string) => {
    try {
      setDeleteid(attachmentId);
      await axios.delete(
        `/api/courses/${courseId}/attachments/${attachmentId}`
      );

      toast.success("Attachment deleted.");
      router.refresh();
    } catch (error) {
      toast.error("something went wrong.");
    } finally {
      setDeleteid(null);
    }
  };

  return (
    <div className="mt-6 border bg-lightBackgroundSea rounded-md p-4">
      <div className="font-medium flex items-center justify-between ">
        Course Attachment
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <p className="flex gap-x-2">
              <PlusCircle size={20} />
              Add a file
            </p>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length == 0 && <p className="italic">no attachments</p>}
          {initialData.attachments.length > 0 && (
            <div>
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex gap-x-2 justify-between bg-secondarySea m-2 p-2 rounded-md "
                >
                  <p className="flex gap-x-2">
                    <File />
                    {attachment.name}
                  </p>
                  {deleteid == attachment.id ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Delete
                      onClick={() => handleDelete(attachment.id)}
                      className="hover:text-teal-500"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url, name) => {
              if (url && name) {
                onSubmit({ url: url, name: name });
              }
            }}
          />
        </div>
      )}
    </div>
  );
};
