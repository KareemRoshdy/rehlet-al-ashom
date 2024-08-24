import { getNewsById } from "@/actions/get-news-by-id";
import ProductCard from "@/components/ProductCard";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "أهم الأخبار",
  description:
    "Explore a wide range of educational and training videos focused on trading. We provide exclusive content that includes trading strategies, technical analysis, and investment opportunities. Stay updated with the latest market trends and strategies through our regularly updated videos, designed to help you achieve your financial goals effectively.  اكتشف مجموعة متنوعة من الفيديوهات التعليمية والتدريبية المتخصصة في التداول. نقدم لك محتوى مميزاً يشمل استراتيجيات التداول، التحليل الفني، والفرص الاستثمارية. تابع أحدث الاتجاهات واستراتيجيات السوق مع فيديوهاتنا المتجددة التي تساعدك على تحقيق أهدافك المالية بفعالية.",
};

interface NewsPageProps {
  params: {
    newsId: string;
  };
}
const NewsPage = async ({ params }: NewsPageProps) => {
  const { userId } = auth();

  const news = await getNewsById(params.newsId);

  if (!news || !userId) {
    redirect("/");
  }

  return (
    <div className="fix-h">
      <ProductCard
        id={news.id}
        title={news.title}
        description={news.description!}
        imageUrl={news.imageUrl!}
      />
    </div>
  );
};

export default NewsPage;
