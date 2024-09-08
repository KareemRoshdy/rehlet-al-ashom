"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React from "react";

interface ConfirmModalProps {
  children: React.ReactNode;
  onConfirm: () => void;
}

const ConfirmModal = ({ children, onConfirm }: ConfirmModalProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="rtl:text-right ltr:text-left">
            هل أنت متاكد؟
          </AlertDialogTitle>
          <AlertDialogDescription className="rtl:text-right ltr:text-left">
            يمكن التراجع عن هذا الإجراء.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="ml-2">إلغاء</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>حذف</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmModal;
