import { getDailyRecommendationById } from "@/actions/get-daily-recommendation-by-id";
import { getSubscribeDailyRecommendations } from "@/actions/get-subscribe-recommendations";
import ProductCard from "@/components/ProductCard";
import { firstStep } from "@/utils/paymobToken";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "التوصيات اليومية",
  description:
    "Explore a wide range of educational and training videos focused on trading. We provide exclusive content that includes trading strategies, technical analysis, and investment opportunities. Stay updated with the latest market trends and strategies through our regularly updated videos, designed to help you achieve your financial goals effectively.  اكتشف مجموعة متنوعة من الفيديوهات التعليمية والتدريبية المتخصصة في التداول. نقدم لك محتوى مميزاً يشمل استراتيجيات التداول، التحليل الفني، والفرص الاستثمارية. تابع أحدث الاتجاهات واستراتيجيات السوق مع فيديوهاتنا المتجددة التي تساعدك على تحقيق أهدافك المالية بفعالية.",
};

interface RecommendationPageProps {
  params: {
    dailyRecommendationId: string;
  };
}

const RecommendationPage = async ({
  params: { dailyRecommendationId },
}: RecommendationPageProps) => {
  const { userId } = auth();

  const recommendation = await getDailyRecommendationById(
    dailyRecommendationId
  );

  if (!recommendation || !userId) {
    redirect("/");
  }

  const isPurchasedDailyRecommendation = await getSubscribeDailyRecommendations(
    {
      userId,
    }
  );

  const purchasedDailyRecommendation = isPurchasedDailyRecommendation.find(
    (recommend) => recommend.id === recommendation.id
  );

  const token = await firstStep(recommendation.price || 0);

  return (
    <div className="fix-h">
      <ProductCard
        id={recommendation.id}
        title={recommendation.title}
        description={recommendation.description!}
        imageUrl={recommendation.imageUrl!}
        price={recommendation.price!}
        purchased={purchasedDailyRecommendation ? true : false}
        type="DAILY_RECOMMENDATIONS"
        token={token}
      />
    </div>
  );
};

export default RecommendationPage;
