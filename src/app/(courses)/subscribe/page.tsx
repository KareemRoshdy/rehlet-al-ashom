import {
  getSubscribeRecommendations,
  getSubscribeDailyRecommendations,
  getSubscribeWallet,
  getSubscribeCourse,
} from "@/actions/get-subscribe-recommendations";
import Categories from "./_components/Categories";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "إشتراكاتي",
  description:
    "Explore a wide range of educational and training videos focused on trading. We provide exclusive content that includes trading strategies, technical analysis, and investment opportunities. Stay updated with the latest market trends and strategies through our regularly updated videos, designed to help you achieve your financial goals effectively.  اكتشف مجموعة متنوعة من الفيديوهات التعليمية والتدريبية المتخصصة في التداول. نقدم لك محتوى مميزاً يشمل استراتيجيات التداول، التحليل الفني، والفرص الاستثمارية. تابع أحدث الاتجاهات واستراتيجيات السوق مع فيديوهاتنا المتجددة التي تساعدك على تحقيق أهدافك المالية بفعالية.",
};

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
