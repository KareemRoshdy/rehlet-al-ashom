"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { useState } from "react";
import { Loader } from "rsuite";

interface DailyRecommendationsEnrollButtonProps {
  price: number;
  dailyRecommendationId: string;
  token: string;
}

const cardPayment = (token: string) => {
  if (typeof window !== "undefined") {
    const iframeUrl = `https://accept.paymob.com/api/acceptance/iframes/879960?payment_token=${token}`;
    window.location.href = iframeUrl;
  } else {
    console.error("window is not defined. Cannot redirect.");
  }
};

const DailyRecommendationsEnrollButton = ({
  price,
  dailyRecommendationId,
  token,
}: DailyRecommendationsEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = () => {
    try {
      setIsLoading(true);
      window.localStorage.removeItem("recommendationId");
      window.localStorage.removeItem("walletId");
      window.localStorage.removeItem("courseId");
      window.localStorage.removeItem("chapterId");

      window.localStorage.setItem(
        "dailyRecommendationId",
        dailyRecommendationId
      );

      cardPayment(token);
    } catch {
      console.log("[PAY_CLICK_ERROR:] Something error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      className="w-full md:w-fit"
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <Loader /> : `Enroll for ${formatPrice(price)}`}
    </Button>
  );
};

export default DailyRecommendationsEnrollButton;
