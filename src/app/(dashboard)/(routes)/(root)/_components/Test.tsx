"use client";

import { formatPrice } from "@/lib/format";
import {
  Course,
  DaleyRecommendation,
  Recommendation,
  Wallet,
} from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Test = () => {
  const courseId = "26565796-c9e9-47f2-88d4-b52054bcaa5e";
  const recommendationId = "1d165f94-ffab-449d-a2e6-74c94307010c";
  const dailyRecommendationId = "e8bcdf6e-3de0-4a15-9404-a6eae3caafba";
  const walletId = "d014d7e8-d574-48e0-ba30-74fb283d6181";

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [course, setCourse] = useState<Course | null>(null);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    null
  );
  const [dailyRecommendation, setDailyRecommendation] =
    useState<DaleyRecommendation | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);

  const amount = 35000 * 100;

  const getData = async () => {
    try {
      setIsLoading(true);

      if (courseId) {
        try {
          const response = await axios.get(`/api/courses/${courseId}`);

          const course: Course = response.data;

          if (course) {
            setCourse(course);
          }
        } catch (error) {
          console.log("Error fetching course:", error);
        }
      }

      if (recommendationId) {
        try {
          const response = await axios.get(
            `/api/recommendations/${recommendationId}`
          );

          const recommendation: Recommendation = response.data;

          if (recommendation) {
            setRecommendation(recommendation);
          }
        } catch (error) {
          console.log("Error fetching recommendation:", error);
        }
      }

      if (dailyRecommendationId) {
        try {
          const response = await axios.get(
            `/api/daily-recommendations/${dailyRecommendationId}`
          );

          const dailyRecommendation: DaleyRecommendation = response.data;

          if (dailyRecommendation) {
            setDailyRecommendation(dailyRecommendation);
          }
        } catch (error) {
          console.log("Error fetching daily recommendation:", error);
        }
      }

      if (walletId) {
        try {
          const response = await axios.get(`/api/wallet/${walletId}`);

          const wallet: Wallet = response.data;

          if (wallet) {
            setWallet(wallet);
          }
        } catch (error) {
          console.log("Error fetching wallet:", error);
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [courseId, recommendationId, dailyRecommendationId, walletId]);

  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          {wallet && <p>wallet: {wallet.title}</p>}
          {recommendation && <p>recommendation: {recommendation.title}</p>}
          {dailyRecommendation && (
            <p>dailyRecommendation: {dailyRecommendation.title}</p>
          )}
          {course && <p>course: {course.title}</p>}
          <p>price: {formatPrice(amount / 100)}</p>
        </>
      )}
    </div>
  );
};

export default Test;
