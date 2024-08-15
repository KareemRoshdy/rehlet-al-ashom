import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

interface Props {
  params: {
    walletId: string;
  };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  try {
    const { userId } = auth();
    const { walletId } = params;

    if (userId !== process.env.NEXT_PUBLIC_ADMIN_ID) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const ownWallet = await prisma.wallet.findUnique({
      where: {
        id: walletId,
      },
    });

    if (!ownWallet) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const wallet = await prisma.wallet.findUnique({
      where: {
        id: walletId,
      },
    });

    if (!wallet) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const unpublishedWallet = await prisma.wallet.update({
      where: {
        id: walletId,
      },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json(unpublishedWallet, { status: 200 });
  } catch (error) {
    console.log("[WALLET_UNPUBLISH]", error);

    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
