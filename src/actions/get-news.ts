import { News } from "@prisma/client";

import prisma from "@/lib/db";

export const getNews = async (): Promise<News[]> => {
  try {
    const news = await prisma.news.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return news;
  } catch (error) {
    return [];
  }
};
