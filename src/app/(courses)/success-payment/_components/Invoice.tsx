"use client";

import {
  getCourse,
  getDailyRecommendation,
  getRecommendation,
  getWallet,
} from "@/actions/get-data";
import Banner from "@/components/banner";
import { formatPrice } from "@/lib/format";
import { useUser } from "@clerk/nextjs";
import {
  Course,
  DaleyRecommendation,
  Recommendation,
  Wallet,
} from "@prisma/client";
import { useRouter } from "next/navigation";
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

const Invoice = async ({
  transaction_id,
  isSuccess,
  courseId,
  recommendationId,
  dailyRecommendationId,
  walletId,
  amount_cents,
}: InvoiceProps) => {
  const { user } = useUser();
  const router = useRouter();

  // All States
  const [course, setCourse] = useState<Course | null>(null);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    null
  );
  const [dailyRecommendation, setDailyRecommendation] =
    useState<DaleyRecommendation | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);

  if (!user) {
    router.push("/");
  }
  const amount = +amount_cents * 100;

  if (courseId) {
    const result = await getCourse(courseId);
    setCourse(result);
  }

  if (recommendationId) {
    const result = await getRecommendation(recommendationId);
    setRecommendation(result);
  }

  if (dailyRecommendationId) {
    const result = await getDailyRecommendation(dailyRecommendationId);
    setDailyRecommendation(result);
  }

  if (walletId) {
    const result = await getWallet(walletId);
    setWallet(result);
  }

  useEffect(() => {
    console.log({
      wallet,
      recommendation,
      dailyRecommendation,
      course,
    });
  }, []);

  return (
    <div className="p-3 max-w-md w-full">
      <Banner label="برجاء أخذ لقطة شاشة لهذه الفاتورة لإثبات عملية الدفع" />

      <div className="my-3 border rounded-md w-full p-2">
        <h2 className="text-xl font-bold text-center mb-6 bg-[#0369a1] text-white">
          فاتورة إشتراك
        </h2>

        <div className="mb-2 border-b pb-2">
          <div className="space-y-2">
            <p>
              <strong>رقم الفاتورة: </strong>
              <span>123456</span>
            </p>
            {user && (
              <p>
                <strong>إسم المستخم: </strong>
                <span>{user?.fullName}</span>
              </p>
            )}
            <p>
              <strong>المبلغ: </strong>
              <span>{formatPrice(amount)}</span>
            </p>
            <p>
              <strong>حالة الدفع: </strong>
              <span>{isSuccess ? "ناجحة" : "غير ناجحة"}</span>
            </p>
            <p>
              <strong>إسم المنتج: </strong>
              <span>تعلم التداول من الصفر الي الاحتراف للمبتدئين</span>
            </p>
          </div>
        </div>

        <span className="text-xs block text-center text-gray-500 font-semibold">
          هذه الفاتورة إثبات لعملية الدفع
        </span>
      </div>
    </div>
  );
};

export default Invoice;
