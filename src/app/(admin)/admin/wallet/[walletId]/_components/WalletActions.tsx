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

interface WalletActionsProps {
  disabled: boolean;
  walletId: string;
  isPublished: boolean;
}

const WalletActions = ({
  disabled,
  walletId,
  isPublished,
}: WalletActionsProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isPublishLoading, setIsPublishLoading] = useState(false);

  const onCLick = async () => {
    try {
      setIsPublishLoading(true);
      if (isPublished) {
        await axios.patch(`/api/wallet/${walletId}/unpublish`);
        toast.success("تم إلغاء نشر المحفظة");
      } else {
        await axios.patch(`/api/wallet/${walletId}/publish`);
        toast.success("تم نشر المحفظة");
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
      await axios.delete(`/api/wallet/${walletId}`);

      toast.success("تم حذف المحفظة");
      router.push(`/admin/wallet`);
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

export default WalletActions;
