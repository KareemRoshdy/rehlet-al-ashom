"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { BadgeX, Verified } from "lucide-react";
import { Loader } from "rsuite";
import Invoice from "./Invoice";

const SuccessPayment = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const [courseId, setCourseId] = useState("");
  const [chapterId, setChapterId] = useState("");

  const [recommendationId, setRecommendationId] = useState("");
  const [dailyRecommendationId, setDailyRecommendationId] = useState("");
  const [walletId, setWalletId] = useState("");

  const searchParams = useSearchParams();

  const success = searchParams.get("success");
  const transaction_id = searchParams.get("id");
  const amount_cents = searchParams.get("amount_cents");
  const created_at = searchParams.get("created_at");
  const currency = searchParams.get("currency");
  const error_occured = searchParams.get("error_occured");
  const has_parent_transaction = searchParams.get("has_parent_transaction");
  const integration_id = searchParams.get("integration_id");
  const is_3d_secure = searchParams.get("is_3d_secure");
  const is_auth = searchParams.get("is_auth");
  const is_capture = searchParams.get("is_capture");
  const is_refunded = searchParams.get("is_refunded");
  const is_standalone_payment = searchParams.get("is_standalone_payment");
  const is_voided = searchParams.get("is_voided");
  const order = searchParams.get("order");
  const owner = searchParams.get("owner");
  const pending = searchParams.get("pending");
  const source_data_pan = searchParams.get("source_data.pan");
  const source_data_sub_type = searchParams.get("source_data.sub_type");
  const source_data_type = searchParams.get("source_data.type");
  const hmac = searchParams.get("hmac");

  const data = {
    success,
    transaction_id,
    created_at,
    amount_cents,
    currency,
    error_occured,
    has_parent_transaction,
    integration_id,
    is_3d_secure,
    is_auth,
    is_capture,
    is_refunded,
    is_standalone_payment,
    is_voided,
    order,
    owner,
    pending,
    source_data_pan,
    source_data_sub_type,
    source_data_type,
  };

  useEffect(() => {
    // Ensure this code runs only on the client
    if (typeof window !== "undefined") {
      setCourseId(window.localStorage.getItem("courseId") || "");
      setChapterId(window.localStorage.getItem("chapterId") || "");
      setRecommendationId(
        window.localStorage.getItem("recommendationId") || ""
      );
      setDailyRecommendationId(
        window.localStorage.getItem("dailyRecommendationId") || ""
      );
      setWalletId(window.localStorage.getItem("walletId") || "");
    }
  }, []);

  const coursePurchased = async () => {
    await axios.post(`/api/courses/${courseId}/checkout`, { transaction_id });
    toast.success("تم الإشتراك بنجاح");
    // router.push(`/courses/${courseId}/chapters/${chapterId}`);
    router.refresh();
  };

  const recommendationPurchased = async () => {
    await axios.post(`/api/recommendations/${recommendationId}/checkout`, {
      transaction_id,
    });
    toast.success("تم الإشتراك بنجاح");
    // router.push(`/recommendations/${recommendationId}`);
    router.refresh();
  };

  const dailyRecommendationPurchased = async () => {
    await axios.post(
      `/api/daily-recommendations/${dailyRecommendationId}/checkout`,
      { transaction_id }
    );
    toast.success("تم الإشتراك بنجاح");
    // router.push(`/daily-recommendations/${dailyRecommendationId}`);
    router.refresh();
  };

  const walletPurchased = async () => {
    await axios.post(`/api/wallet/${walletId}/checkout`, { transaction_id });
    toast.success("تم الإشتراك بنجاح");
    // router.push(`/wallet/${walletId}`);
    router.refresh();
  };

  const successHandler = async () => {
    try {
      setIsLoading(true);
      setIsSuccess(true);

      const res = await axios.post(`/api/verify-hmac`, { data, hmac });

      const result = res.data.valid;

      if (result) {
        if (courseId && chapterId) {
          await coursePurchased();
        } else if (recommendationId) {
          await recommendationPurchased();
        } else if (dailyRecommendationId) {
          await dailyRecommendationPurchased();
        } else if (walletId) {
          await walletPurchased();
        } else {
          console.log("No valid IDs found.");
        }
      } else {
        setIsSuccess(false);
        toast.error("عملية دفع غير ناجحة");
      }
    } catch (err: any) {
      console.log("Error:", err.message);
      setIsSuccess(false);
      toast.error("عملية دفع غير ناجحة");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      if (success === "true") {
        setIsSuccess(true);
        successHandler();
      } else {
        setIsSuccess(false);
        setIsLoading(false);
        toast.error("عملية دفع غير ناجحة");
      }
    }
  }, [success, isMounted]);

  return (
    <div className="flex items-center justify-center h-full fix-h pb-9">
      <div>
        {isLoading ? (
          <div>
            <Loader
              center
              content="  تحميل..."
              className="text-center m-auto flex gap-x-2"
            />
          </div>
        ) : (
          <>
            {isSuccess ? (
              <div>
                <Verified className="flex items-center justify-center my-3 mx-auto text-green-700 w-40 h-40" />
                <h2 className="mb-5 text-center">تم الدفع بنجاح</h2>

                <Invoice
                  transaction_id={transaction_id!}
                  isSuccess={isSuccess}
                  courseId={courseId}
                  recommendationId={recommendationId}
                  dailyRecommendationId={dailyRecommendationId}
                  walletId={walletId}
                  amount_cents={amount_cents!}
                />
              </div>
            ) : (
              <>
                <BadgeX className="flex items-center justify-center my-3 mx-auto text-red-700 w-40 h-40" />
                <h2 className="mb-5 text-center">عملية دفع غير ناجحة</h2>

                <Invoice
                  transaction_id={transaction_id!}
                  isSuccess={isSuccess}
                  courseId={courseId}
                  recommendationId={recommendationId}
                  dailyRecommendationId={dailyRecommendationId}
                  walletId={walletId}
                  amount_cents={amount_cents!}
                />
              </>
            )}

            <Button size="sm" className="text-center block w-fit m-auto">
              <Link className="m-auto" href={`/courses`}>
                العودة الي صفحة الدورات
              </Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default SuccessPayment;
