import { DaleyRecommendation } from "@prisma/client";

import prisma from "@/lib/db";

export const getDailyRecommendations = async (): Promise<
  DaleyRecommendation[]
> => {
  try {
    const dailyRecommendations = await prisma.daleyRecommendation.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return dailyRecommendations;
  } catch (error) {
    return [];
  }
};
