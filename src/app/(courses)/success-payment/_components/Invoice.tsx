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

  const amount = +amount_cents * 100;

  const getData = async () => {
    if (courseId) {
      try {
        const response = await axios.get(`/api/courses/${courseId}`);

        const course: Course = response.data;

        if (!course) {
          return null;
        }

        setCourse(course);
      } catch (error) {
        console.log(error);
      }
    }

    if (recommendationId) {
      try {
        const response = await axios.get(
          `/api/recommendations/${recommendationId}`
        );

        const recommendation: Recommendation = response.data;

        if (!recommendation) {
          return null;
        }

        setRecommendation(recommendation);
      } catch (error) {
        console.log(error);
      }
    }

    if (dailyRecommendationId) {
      try {
        const response = await axios.get(
          `/api/daily-recommendations/${dailyRecommendationId}`
        );

        const recommendation: DaleyRecommendation = response.data;

        if (!recommendation) {
          return null;
        }

        setDailyRecommendation(recommendation);
      } catch (error) {
        console.log(error);
      }
    }

    if (walletId) {
      try {
        const response = await axios.get(`/api/wallet/${walletId}`);

        const wallet: Wallet = response.data;

        if (!wallet) {
          return null;
        }

        setWallet(wallet);
      } catch (error) {
        console.log(error);
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
