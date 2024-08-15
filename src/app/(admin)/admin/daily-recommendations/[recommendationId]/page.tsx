import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { IconBadge } from "@/components/IconBadge";
import { CircleDollarSign, LayoutDashboard } from "lucide-react";
import TitleForm from "./_components/TitleForm";
import ImageForm from "./_components/ImageForm";
import PriceForm from "./_components/PriceForm";
import Banner from "@/components/banner";
import RecommendationActions from "./_components/RecommendationActions";
import DescriptionForm from "./_components/DescriptionForm";

interface RecommendationPageProps {
  params: { recommendationId: string };
}

const RecommendationPage = async ({
  params: { recommendationId },
}: RecommendationPageProps) => {
  const recommendation = await prisma.daleyRecommendation.findUnique({
    where: {
      id: recommendationId,
    },
  });

  if (!recommendation) {
    return redirect("/");
  }

  const requiredFields = [
    recommendation.title,
    recommendation.description,
    recommendation.imageUrl,
    recommendation.price,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!recommendation.isPublished && (
        <Banner
          variant="warning"
          label="هذه الباقة غير منشورة. لن تكون مرئية للمستخدمين"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">إعداد الباقة</h1>
            <span className="text-sm text-slate-700">
              إملاء جميع الحقول {completionText}
            </span>
          </div>

          {/* Add Actions */}
          <RecommendationActions
            disabled={!isComplete}
            recommendationId={recommendationId}
            isPublished={recommendation.isPublished ?? false}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-2xl">قم بتخصيص باقتك</h2>
            </div>

            <TitleForm
              initialData={recommendation}
              recommendationId={recommendation.id}
            />
            <DescriptionForm
              initialData={recommendation}
              recommendationId={recommendation.id}
            />
            <ImageForm
              initialData={recommendation}
              recommendationId={recommendation.id}
            />
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">بيع باقتك</h2>
              </div>

              <PriceForm
                initialData={recommendation}
                recommendationId={recommendation.id}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecommendationPage;
