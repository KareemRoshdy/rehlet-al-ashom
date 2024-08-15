import { getNewsById } from "@/actions/get-news-by-id";
import { getSubscribeWallet } from "@/actions/get-subscribe-recommendations";
import ProductCard from "@/components/ProductCard";
import { firstStep } from "@/utils/paymobToken";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

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
