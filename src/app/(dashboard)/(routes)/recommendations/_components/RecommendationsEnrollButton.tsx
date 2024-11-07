"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { useState } from "react";
import { Loader } from "rsuite";

interface RecommendationsEnrollButtonProps {
  price: number;
  recommendationId: string;
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

const RecommendationsEnrollButton = ({
  price,
  recommendationId,
  token,
}: RecommendationsEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = () => {
    try {
      setIsLoading(true);
      window.localStorage.removeItem("dailyRecommendationId");
      window.localStorage.removeItem("walletId");
      window.localStorage.removeItem("courseId");
      window.localStorage.removeItem("chapterId");

      window.localStorage.setItem("recommendationId", recommendationId);

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
      className="w-full md:w-fit bg-blue-800 hover:bg-green-600 "
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <Loader /> : `${formatPrice(price)}`}
    </Button>
  );
};

export default RecommendationsEnrollButton;
