import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Hero from "./_components/Hero";
import News from "./_components/News";
import Recommendations from "./_components/Recommendations";
import DaleyRecommendations from "./_components/DaleyRecommendations";
import SocialMedia from "@/components/SocialMedia";
import Wallet from "./_components/Wallet";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Explore a wide range of educational and training videos focused on trading. We provide exclusive content that includes trading strategies, technical analysis, and investment opportunities. Stay updated with the latest market trends and strategies through our regularly updated videos, designed to help you achieve your financial goals effectively.  اكتشف مجموعة متنوعة من الفيديوهات التعليمية والتدريبية المتخصصة في التداول. نقدم لك محتوى مميزاً يشمل استراتيجيات التداول، التحليل الفني، والفرص الاستثمارية. تابع أحدث الاتجاهات واستراتيجيات السوق مع فيديوهاتنا المتجددة التي تساعدك على تحقيق أهدافك المالية بفعالية.",
};

export default async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  return (
    <div>
      <SocialMedia />

      <div>
        <Hero />
      </div>

      <div>
        <News />
      </div>

      <div>
        <Recommendations />
      </div>

      <div>
        <DaleyRecommendations />
      </div>

      <div>
        <Wallet />
      </div>
    </div>
  );
}
