import { getRecommendationById } from "@/actions/get-recommendation-by-id";
import { getSubscribeRecommendations } from "@/actions/get-subscribe-recommendations";
import ProductCard from "@/components/ProductCard";
import { firstStep } from "@/utils/paymobToken";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "التوصيات اللحظية",
  description:
    "Explore a wide range of educational and training videos focused on trading. We provide exclusive content that includes trading strategies, technical analysis, and investment opportunities. Stay updated with the latest market trends and strategies through our regularly updated videos, designed to help you achieve your financial goals effectively.  اكتشف مجموعة متنوعة من الفيديوهات التعليمية والتدريبية المتخصصة في التداول. نقدم لك محتوى مميزاً يشمل استراتيجيات التداول، التحليل الفني، والفرص الاستثمارية. تابع أحدث الاتجاهات واستراتيجيات السوق مع فيديوهاتنا المتجددة التي تساعدك على تحقيق أهدافك المالية بفعالية.",
};

interface RecommendationPageProps {
  params: {
    recommendationId: string;
  };
}

const RecommendationPage = async ({
  params: { recommendationId },
}: RecommendationPageProps) => {
  const { userId } = auth();

  const recommendation = await getRecommendationById(recommendationId);

  if (!recommendation || !userId) {
    redirect("/");
  }

  const isPurchasedRecommendation = await getSubscribeRecommendations({
    userId,
  });

  const purchasedRecommendation = isPurchasedRecommendation.find(
    (recommend) => recommend.id === recommendationId
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
        purchased={purchasedRecommendation ? true : false}
        token={token}
        type="RECOMMENDATIONS"
      />
    </div>
  );
};

export default RecommendationPage;
