import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import isAdmin from "@/lib/adminValidation";
import { IconBadge } from "@/components/IconBadge";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionForm";
import ImageForm from "./_components/ImageForm";
import PriceForm from "./_components/PriceForm";
import ChaptersForm from "./_components/ChaptersForm";
import Banner from "@/components/banner";
import CourseActions from "./_components/CourseActions";

interface CourseIdProps {
  params: { courseId: string };
}

const CourseIdPage = async ({ params: { courseId } }: CourseIdProps) => {
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!course.isPublished && (
        <Banner
          variant="warning"
          label="هذه الدورة غير منشورة. لن تكون مرئية للمستخدمين"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">إعداد الدورة</h1>
            <span className="text-sm text-slate-700">
              إملاء جميع الحقول {completionText}
            </span>
          </div>

          {/* Add Actions */}
          <CourseActions
            disabled={!isComplete}
            courseId={courseId}
            isPublished={course.isPublished ?? false}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-2xl">قم بتخصيص دورتك</h2>
            </div>

            <TitleForm initialData={course} courseId={course.id} />
            <DescriptionForm initialData={course} courseId={course.id} />
            <ImageForm initialData={course} courseId={course.id} />
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">أقسام الدورة</h2>
              </div>

              <ChaptersForm initialData={course} courseId={course.id} />
            </div>

            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">بيع دورتك</h2>
              </div>

              <PriceForm initialData={course} courseId={course.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseIdPage;
