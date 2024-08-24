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
  const router = useRouter();

  // All States
  const [course, setCourse] = useState<Course | null>(null);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    null
  );
  const [dailyRecommendation, setDailyRecommendation] =
    useState<DaleyRecommendation | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);

  const amount = +amount_cents;

  const getData = async () => {
    if (courseId) {
      try {
        const response = await axios.get(`/api/courses/${courseId}`);
        console.log("Course Response:", response);

        const course: Course = response.data;

        if (!course) {
          console.log("No course found");
          return null;
        }

        setCourse(course);
      } catch (error) {
        console.log("Error fetching course:", error);
      }
    }

    if (recommendationId) {
      try {
        const response = await axios.get(
          `/api/recommendations/${recommendationId}`
        );
        console.log("Recommendation Response:", response);

        const recommendation: Recommendation = response.data;

        if (!recommendation) {
          console.log("No recommendation found");
          return null;
        }

        setRecommendation(recommendation);
      } catch (error) {
        console.log("Error fetching recommendation:", error);
      }
    }

    if (dailyRecommendationId) {
      try {
        const response = await axios.get(
          `/api/daily-recommendations/${dailyRecommendationId}`
        );
        console.log("Daily Recommendation Response:", response);

        const dailyRecommendation: DaleyRecommendation = response.data;

        if (!dailyRecommendation) {
          console.log("No daily recommendation found");
          return null;
        }

        setDailyRecommendation(dailyRecommendation);
      } catch (error) {
        console.log("Error fetching daily recommendation:", error);
      }
    }

    if (walletId) {
      try {
        const response = await axios.get(`/api/wallet/${walletId}`);
        console.log("Wallet Response:", response);

        const wallet: Wallet = response.data;

        if (!wallet) {
          console.log("No wallet found");
          return null;
        }

        setWallet(wallet);
      } catch (error) {
        console.log("Error fetching wallet:", error);
      }
    }
  };

  useEffect(() => {
    getData();
    console.log({
      wallet,
      recommendation,
      dailyRecommendation,
      course,
    });
  }, [courseId, recommendationId, dailyRecommendationId, walletId]);

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
              <span>{transaction_id}</span>
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
