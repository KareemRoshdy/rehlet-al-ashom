"use client";

import axios from "axios";
import { useState } from "react";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader } from "rsuite";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface newsActionsProps {
  disabled: boolean;
  newsId: string;
  isPublished: boolean;
}

const NewsActions = ({ disabled, newsId, isPublished }: newsActionsProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isPublishLoading, setIsPublishLoading] = useState(false);

  const onCLick = async () => {
    try {
      setIsPublishLoading(true);
      if (isPublished) {
        await axios.patch(`/api/news/${newsId}/unpublish`);
        toast.success("تم إلغاء نشر الخبر");
      } else {
        await axios.patch(`/api/news/${newsId}/publish`);
        toast.success("تم نشر الخبر");
        confetti.onOpen();
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
      await axios.delete(`/api/news/${newsId}`);

      toast.success("تم حذف الخبر");
      router.push(`/admin/news`);
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
        {isPublishLoading ? <Loader /> : isPublished ? "إلغاء النشر" : "نشر"}
      </Button>

      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading || isPublishLoading}>
          {isLoading ? <Loader /> : <Trash className="h-4 w-4" />}
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default NewsActions;
