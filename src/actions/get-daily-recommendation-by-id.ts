import { DaleyRecommendation } from "@prisma/client";

import prisma from "@/lib/db";

export const getDailyRecommendationById = async (
  id: string
): Promise<DaleyRecommendation | null> => {
  try {
    const dailyRecommendation = await prisma.daleyRecommendation.findUnique({
      where: {
        id,
      },
    });

    return dailyRecommendation;
  } catch (error) {
    return null;
  }
};
