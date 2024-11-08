"use client";

import Banner from "@/components/banner";
import { formatPrice } from "@/lib/format";
import { useUser } from "@clerk/nextjs";
import {
  Course,
  DaleyRecommendation,
  Recommendation,
  Wallet,
} from "@prisma/client";
import axios from "axios";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

interface InvoiceProps {
  transaction_id?: string;
  isSuccess?: boolean;
  courseId?: string;
  recommendationId?: string;
  dailyRecommendationId?: string;
  walletId?: string;
  amount_cents: string;
}

const Invoice = ({
  transaction_id,
  isSuccess,
  courseId,
  recommendationId,
  dailyRecommendationId,
  walletId,
  amount_cents,
}: InvoiceProps) => {
  const { user } = useUser();

  // All States
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [course, setCourse] = useState<Course | null>(null);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    null
  );
  const [dailyRecommendation, setDailyRecommendation] =
    useState<DaleyRecommendation | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);

  const getData = async () => {
    try {
      setIsLoading(true);

      if (courseId) {
        const response = await axios.get(`/api/courses/${courseId}`);
        setCourse(response.data);
      }

      if (recommendationId) {
        const response = await axios.get(
          `/api/recommendations/${recommendationId}`
        );
        setRecommendation(response.data);
      }

      if (dailyRecommendationId) {
        const response = await axios.get(
          `/api/daily-recommendations/${dailyRecommendationId}`
        );
        setDailyRecommendation(response.data);
      }

      if (walletId) {
        const response = await axios.get(`/api/wallet/${walletId}`);
        setWallet(response.data);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [courseId, recommendationId, dailyRecommendationId, walletId]);

  const amountInCents = +amount_cents || 0;

  return (
    <div className="p-3 max-w-md w-full">
      <Banner label="برجاء أخذ لقطة شاشة لهذه الفاتورة لإثبات عملية الدفع" />

      {isLoading ? (
        <div className="w-full text-center flex items-center justify-center gap-x-1 my-2">
          <Loader className="size-4 animate-spin" />
          <span className="text-xs text-gray-500">يتم تحميل الفاتورة...</span>
        </div>
      ) : (
        <div className="my-3 border rounded-md w-full p-2">
          <h2
            className={`text-xl font-bold text-center mb-6 text-white ${
              isSuccess ? "bg-[#0369a1]" : "bg-red-600"
            }`}
          >
            {isSuccess ? "فاتورة إشتراك" : "لم يتم الإشتراك"}
          </h2>

          <div className="mb-2 border-b pb-2">
            <div className="space-y-2">
              {transaction_id && (
                <p>
                  <strong>رقم الفاتورة: </strong>
                  <span>{transaction_id}</span>
                </p>
              )}

              {user && (
                <p>
                  <strong>إسم المستخدم: </strong>
                  <span>{user?.fullName}</span>
                </p>
              )}

              {amount_cents && (
                <p>
                  <strong>المبلغ: </strong>
                  <span>{formatPrice(amountInCents / 100)}</span>
                </p>
              )}

              <p>
                <strong>حالة الدفع: </strong>
                <span>{isSuccess ? "ناجحة" : "غير ناجحة"}</span>
              </p>

              {course && (
                <p>
                  <strong>إسم المنتج: </strong>
                  <span>{course.title}</span>
                </p>
              )}

              {wallet && (
                <p>
                  <strong>إسم المنتج: </strong>
                  <span>{wallet.title}</span>
                </p>
              )}

              {recommendation && (
                <p>
                  <strong>إسم المنتج: </strong>
                  <span>{recommendation.title}</span>
                </p>
              )}

              {dailyRecommendation && (
                <p>
                  <strong>إسم المنتج: </strong>
                  <span>{dailyRecommendation.title}</span>
                </p>
              )}
            </div>
          </div>

          <span className="text-xs block text-center text-gray-500 font-semibold">
            هذه الفاتورة إثبات لعملية الدفع
          </span>
        </div>
      )}
    </div>
  );
};

export default Invoice;
