import { Wallet } from "@prisma/client";

import prisma from "@/lib/db";

export const getWalletById = async (id: string): Promise<Wallet | null> => {
  try {
    const wallet = await prisma.wallet.findUnique({
      where: { id },
    });

    return wallet;
  } catch (error) {
    return null;
  }
};
