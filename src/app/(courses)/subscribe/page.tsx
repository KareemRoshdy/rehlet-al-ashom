import {
  getSubscribeRecommendations,
  getSubscribeDailyRecommendations,
  getSubscribeWallet,
  getSubscribeCourse,
} from "@/actions/get-subscribe-recommendations";
import Categories from "./_components/Categories";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const SubscribePage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const recommendations = await getSubscribeRecommendations({ userId });
  const dailyRecommendations = await getSubscribeDailyRecommendations({
    userId,
  });
  const wallet = await getSubscribeWallet({ userId });
  const courses = await getSubscribeCourse({ userId });

  return (
    <div className="p-6 space-y-4">
      <Categories
        courses={courses}
        recommendations={recommendations}
        dailyRecommendations={dailyRecommendations}
        wallet={wallet}
      />
    </div>
  );
};

export default SubscribePage;
