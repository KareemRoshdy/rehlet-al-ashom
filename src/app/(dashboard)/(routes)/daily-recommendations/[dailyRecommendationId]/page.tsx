import { getDailyRecommendationById } from "@/actions/get-daily-recommendation-by-id";
import { getSubscribeDailyRecommendations } from "@/actions/get-subscribe-recommendations";
import ProductCard from "@/components/ProductCard";
import { firstStep } from "@/utils/paymobToken";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

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
