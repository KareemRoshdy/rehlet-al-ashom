import { News } from "@prisma/client";

import prisma from "@/lib/db";

export const getNewsById = async (id: string): Promise<News | null> => {
  try {
    const news = await prisma.news.findUnique({
      where: {
        id,
      },
    });

    return news || null;
  } catch (error) {
    return null;
  }
};
