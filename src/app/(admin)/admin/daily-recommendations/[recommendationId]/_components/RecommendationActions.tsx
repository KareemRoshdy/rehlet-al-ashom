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

interface RecommendationActionsProps {
  disabled: boolean;
  recommendationId: string;
  isPublished: boolean;
}

const RecommendationActions = ({
  disabled,
  recommendationId,
  isPublished,
}: RecommendationActionsProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isPublishLoading, setIsPublishLoading] = useState(false);

  const onCLick = async () => {
    try {
      setIsPublishLoading(true);
      if (isPublished) {
        await axios.patch(
          `/api/daily-recommendations/${recommendationId}/unpublish`
        );
        toast.success("تم إلغاء نشر الباقة");
      } else {
        await axios.patch(
          `/api/daily-recommendations/${recommendationId}/publish`
        );
        toast.success("تم نشر الباقة");
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
      await axios.delete(`/api/daily-recommendations/${recommendationId}`);

      toast.success("تم حذف الباقة");
      router.push(`/admin/daily-recommendations`);
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

export default RecommendationActions;
