"use client";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface courseEnrollButtonProps {
  price: number;
  courseId: string;
}
const CourseEnrollButton = ({ price, courseId }: courseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/courses/${courseId}/checkout`);
      console.log(response);
      window.location.assign(response.data.url);
    } catch (error) {
      console.log("error", error);
      toast.error("something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      size={"sm"}
      className="w-full md:w-auto"
    >
      Enroll for {formatPrice(price)}
    </Button>
  );
};

export default CourseEnrollButton;
