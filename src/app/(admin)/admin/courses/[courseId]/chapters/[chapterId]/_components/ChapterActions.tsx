"use client";

import axios from "axios";
import { useState } from "react";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

import ConfirmModal from "@/components/modals/ConfirmModal";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader } from "rsuite";

interface ChapterActionsProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}

const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ChapterActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isPublishLoading, setIsPublishLoading] = useState(false);

  const onCLick = async () => {
    try {
      setIsPublishLoading(true);
      if (isPublished) {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/unpublish`
        );

        toast.success("تم إالغاء النشر");
      } else {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/publish`
        );

        toast.success("تم نشر القسم");
      }

      router.refresh();
    } catch {
      toast.error("حدث خطاء");
    } finally {
      setIsPublishLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);

      toast.success("تم حذف القسم");
      router.push(`/teacher/courses/${courseId}`);
      router.refresh();
    } catch {
      toast.error("حدث خطاء");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onCLick}
        disabled={disabled || isLoading || isPublishLoading}
        variant="outline"
        size="sm"
      >
        {isPublishLoading ? <Loader /> : isPublished ? "إالغاء النشر" : "نشر"}
      </Button>

      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading || isPublishLoading}>
          {isLoading ? <Loader /> : <Trash className="h-4 w-4" />}
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default ChapterActions;
