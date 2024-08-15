import isAdmin from "@/lib/adminValidation";
import { redirect } from "next/navigation";

import prisma from "@/lib/db";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  LayoutDashboard,
  Video,
} from "lucide-react";
import { IconBadge } from "@/components/IconBadge";
import ChapterTitleForm from "./_components/ChapterTitleForm";
import ChapterDescriptionForm from "./_components/ChapterDescriptionForm";
import ChapterAccessForm from "./_components/ChapterAccessForm";
import ChapterVideoForm from "./_components/ChapterVideoForm";
import Banner from "@/components/banner";
import ChapterActions from "./_components/ChapterActions";

interface ChapterIdPageProps {
  params: {
    chapterId: string;
    courseId: string;
  };
}

const ChapterIdPage = async ({ params }: ChapterIdPageProps) => {
  const chapter = await prisma.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  });

  if (!chapter) {
    return redirect("/");
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="هذا الفصل غير منشور. لن يكون مرئيًا في الدورة"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/admin/courses/${params.courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowRight className="h-4 w-4 ml-2" />
              العودة إلى إعداد الدورة
            </Link>

            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">إنشاء القسم</h1>
                <span className="text-sm text-slate-700">
                  أكمل جميع الحقول {completionText}
                </span>
              </div>

              <ChapterActions
                disabled={!isComplete}
                courseId={params.courseId}
                chapterId={params.chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">خصص فصل دراستك</h2>
              </div>

              {/* Chapter Title Form */}
              <ChapterTitleForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
              {/* Chapter Description Form */}
              <ChapterDescriptionForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>

            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />

                <h2 className="text-xl">إعدادات الوصول</h2>
              </div>

              {/* Chapter Access Form */}
              <ChapterAccessForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl">إضافة فيديو</h2>
            </div>

            {/* Chapter Video Form */}
            <ChapterVideoForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterIdPage;
