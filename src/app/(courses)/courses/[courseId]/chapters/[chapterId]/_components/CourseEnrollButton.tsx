"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { useState } from "react";
import { Loader } from "rsuite";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
  token: string;
  chapterId: string;
}

// Change Iframe
const cardPayment = (token: string) => {
  if (typeof window !== "undefined") {
    const iframeUrl = `https://accept.paymob.com/api/acceptance/iframes/879960?payment_token=${token}`;
    window.location.href = iframeUrl;
  } else {
    console.error("window is not defined. Cannot redirect.");
  }
};

const CourseEnrollButton = ({
  price,
  courseId,
  token,
  chapterId,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = () => {
    try {
      setIsLoading(true);
      window.localStorage.removeItem("recommendationId");
      window.localStorage.removeItem("dailyRecommendationId");
      window.localStorage.removeItem("walletId");

      window.localStorage.setItem("courseId", courseId);
      window.localStorage.setItem("chapterId", chapterId);

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

export default CourseEnrollButton;
