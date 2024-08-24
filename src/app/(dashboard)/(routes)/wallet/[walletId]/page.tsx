import { getSubscribeWallet } from "@/actions/get-subscribe-recommendations";
import { getWalletById } from "@/actions/get-wallet-by-id";
import ProductCard from "@/components/ProductCard";
import { firstStep } from "@/utils/paymobToken";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "إدارة المحافظ",
  description:
    "Explore a wide range of educational and training videos focused on trading. We provide exclusive content that includes trading strategies, technical analysis, and investment opportunities. Stay updated with the latest market trends and strategies through our regularly updated videos, designed to help you achieve your financial goals effectively.  اكتشف مجموعة متنوعة من الفيديوهات التعليمية والتدريبية المتخصصة في التداول. نقدم لك محتوى مميزاً يشمل استراتيجيات التداول، التحليل الفني، والفرص الاستثمارية. تابع أحدث الاتجاهات واستراتيجيات السوق مع فيديوهاتنا المتجددة التي تساعدك على تحقيق أهدافك المالية بفعالية.",
};

interface NewsPageProps {
  params: {
    walletId: string;
  };
}
const NewsPage = async ({ params }: NewsPageProps) => {
  const { userId } = auth();

  const wallet = await getWalletById(params.walletId);

  if (!wallet || !userId) {
    redirect("/");
  }

  const isPurchasedWallet = await getSubscribeWallet({ userId });

  const purchasedWallet = isPurchasedWallet.find(
    (wallet) => wallet.id === params.walletId
  );

  const token = await firstStep(wallet.price || 0);

  return (
    <div className="fix-h">
      <ProductCard
        id={wallet.id}
        title={wallet.title}
        description={wallet.description!}
        imageUrl={wallet.imageUrl!}
        price={wallet.price!}
        purchased={purchasedWallet ? true : false}
        token={token}
        type="WALLET"
      />
    </div>
  );
};

export default NewsPage;
