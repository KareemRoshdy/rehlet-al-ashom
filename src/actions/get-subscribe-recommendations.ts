import prisma from "@/lib/db";
import {
  Recommendation,
  DaleyRecommendation,
  Wallet,
  Course,
} from "@prisma/client";

interface Props {
  userId: string;
}

export const getSubscribeRecommendations = async ({
  userId,
}: Props): Promise<Recommendation[]> => {
  try {
    const recommendations = await prisma.recommendation.findMany({
      where: {
        isPublished: true,
        RecommendationPurchase: {
          some: {
            userId: userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return recommendations;
  } catch (error) {
    console.log("[GET_RECOMMENDATIONS]", error);
    return [];
  }
};

export const getSubscribeDailyRecommendations = async ({
  userId,
}: Props): Promise<DaleyRecommendation[]> => {
  try {
    const dailyRecommendations = await prisma.daleyRecommendation.findMany({
      where: {
        isPublished: true,
        daleyRecommendationPurchase: {
          some: {
            userId: userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return dailyRecommendations;
  } catch (error) {
    console.log("[GET_DAILY_RECOMMENDATIONS]", error);
    return [];
  }
};

export const getSubscribeWallet = async ({
  userId,
}: Props): Promise<Wallet[]> => {
  try {
    const wallet = await prisma.wallet.findMany({
      where: {
        isPublished: true,
        walletPurchase: {
          some: {
            userId: userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return wallet;
  } catch (error) {
    console.log("[GET_WALLET]", error);
    return [];
  }
};

export const getSubscribeCourse = async ({
  userId,
}: Props): Promise<Course[]> => {
  try {
    const courses = await prisma.course.findMany({
      where: {
        isPublished: true,
        purchases: {
          some: {
            userId: userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return courses;
  } catch (error) {
    console.log("[GET_WALLET]", error);
    return [];
  }
};
