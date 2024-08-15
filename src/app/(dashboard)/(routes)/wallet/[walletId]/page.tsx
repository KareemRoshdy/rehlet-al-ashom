import { getSubscribeWallet } from "@/actions/get-subscribe-recommendations";
import { getWalletById } from "@/actions/get-wallet-by-id";
import ProductCard from "@/components/ProductCard";
import { firstStep } from "@/utils/paymobToken";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

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
