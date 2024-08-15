import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { IconBadge } from "@/components/IconBadge";
import { Image, LayoutDashboard } from "lucide-react";
import TitleForm from "./_components/TitleForm";
import ImageForm from "./_components/ImageForm";
import Banner from "@/components/banner";
import DescriptionForm from "./_components/DescriptionForm";
import NewsActions from "./_components/newsActions";

interface newsPageProps {
  params: { newsId: string };
}

const newsPage = async ({ params: { newsId } }: newsPageProps) => {
  const news = await prisma.news.findUnique({
    where: {
      id: newsId,
    },
  });

  if (!news) {
    return redirect("/");
  }

  const requiredFields = [news.title, news.description, news.imageUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!news.isPublished && (
        <Banner
          variant="warning"
          label="هذا الخبر غير منشور. لن يكون مرئي للمستخدمين"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">إعداد الخبر</h1>
            <span className="text-sm text-slate-700">
              إملاء جميع الحقول {completionText}
            </span>
          </div>

          {/* Add Actions */}
          <NewsActions
            disabled={!isComplete}
            newsId={newsId}
            isPublished={news.isPublished ?? false}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-2xl">قم بتخصيص باقتك</h2>
            </div>

            <TitleForm initialData={news} newsId={news.id} />
            <DescriptionForm initialData={news} newsId={news.id} />
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Image} />
                <h2 className="text-xl">صورة الخبر</h2>
              </div>

              <ImageForm initialData={news} newsId={news.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default newsPage;
