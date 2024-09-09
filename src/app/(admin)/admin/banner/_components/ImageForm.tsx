"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { Banner } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/FileUpload";

interface ImageFormProps {
  initialData: Banner;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, { message: "صورة الصفحة الرئيسية مطلوبة" }),
});

const ImageForm = ({ initialData }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/banner`, values);

      toggleEdit();
      toast.success("تم تحديث الصفحة الرئيسية");
      router.refresh();
    } catch {
      toast.error("حدث خطاء");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        صورة الصفحة الرئيسية
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && <>إلغاء</>}

          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 ml-2" /> إضافة صورة
            </>
          )}

          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 ml-2" /> تعديل
            </>
          )}
        </Button>
      </div>

      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 rounded-md bg-slate-200">
            <ImageIcon className="h-4 w-4 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={initialData.imageUrl}
            />
          </div>
        ))}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            نسبة العرض إلى الارتفاع 16:9 مفضلة
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageForm;
