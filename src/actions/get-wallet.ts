import { Wallet } from "@prisma/client";

import prisma from "@/lib/db";

export const getWallet = async (): Promise<Wallet[]> => {
  try {
    const wallet = await prisma.wallet.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return wallet;
  } catch (error) {
    return [];
  }
};
