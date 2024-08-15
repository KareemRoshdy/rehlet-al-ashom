import { Recommendation } from "@prisma/client";

import prisma from "@/lib/db";

export const getRecommendations = async (): Promise<Recommendation[]> => {
  try {
    const recommendations = await prisma.recommendation.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return recommendations;
  } catch (error) {
    return [];
  }
};
