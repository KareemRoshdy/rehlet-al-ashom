import { getRecommendationById } from "@/actions/get-recommendation-by-id";
import { getSubscribeRecommendations } from "@/actions/get-subscribe-recommendations";
import ProductCard from "@/components/ProductCard";
import { firstStep } from "@/utils/paymobToken";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

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
