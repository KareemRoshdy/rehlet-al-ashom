import { Preview } from "@/components/preview";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

import BackHome from "./BackHome";
import { CheckCheck } from "lucide-react";
import DailyRecommendationsEnrollButton from "@/app/(dashboard)/(routes)/daily-recommendations/_components/DailyRecommendationsEnrollButton";
import RecommendationsEnrollButton from "@/app/(dashboard)/(routes)/recommendations/_components/RecommendationsEnrollButton";
import WalletEnrollButton from "@/app/(dashboard)/(routes)/wallet/_components/WalletEnrollButton";

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price?: number;
  purchased?: boolean;
  token?: string;
  type?: string;
}

const ProductCard = ({
  id,
  title,
  price,
  description,
  imageUrl,
  purchased,
  token,
  type,
}: ProductCardProps) => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 sm:py-20 lg:px-8">
        <div>
          <BackHome />
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-2">
          <h2 className="text-2xl md:text-3xl font-bold sm:text-4xl">
            {title}
          </h2>

          {price && !purchased && (
            <div className="md:mr-auto mt-5">
              {type === "DAILY_RECOMMENDATIONS" && (
                <DailyRecommendationsEnrollButton
                  price={price}
                  dailyRecommendationId={id}
                  token={token!}
                />
              )}

              {type === "RECOMMENDATIONS" && (
                <RecommendationsEnrollButton
                  price={price}
                  recommendationId={id}
                  token={token!}
                />
              )}

              {type === "WALLET" && (
                <WalletEnrollButton
                  price={price}
                  walletId={id}
                  token={token!}
                />
              )}
            </div>
          )}

          {purchased && (
            <p className="flex items-center md:mr-auto mt-5 w-full md:w-fit gap-x-2 text-xl font-semibold text-green-600">
              <CheckCheck />
              تم الإشتراك
            </p>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-72 overflow-hidden md:h-[350px] rounded-md shadow-md  w-full">
            <img
              alt={title}
              src={imageUrl}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="lg:py-10">
            <article className="space-y-4 text-gray-600">
              <p>
                <Preview value={description} />
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
