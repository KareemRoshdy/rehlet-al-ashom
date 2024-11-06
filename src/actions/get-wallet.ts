import { Wallet } from "@prisma/client";

import prisma from "@/lib/db";

export const getWallet = async (): Promise<Wallet[]> => {
  try {
    const wallet = await prisma.wallet.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return wallet;
  } catch (error) {
    return [];
  }
};
