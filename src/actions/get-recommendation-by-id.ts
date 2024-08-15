import { Recommendation } from "@prisma/client";

import prisma from "@/lib/db";

export const getRecommendationById = async (
  id: string
): Promise<Recommendation | null> => {
  try {
    const recommendation = await prisma.recommendation.findUnique({
      where: { id },
    });

    return recommendation;
  } catch (error) {
    return null;
  }
};
