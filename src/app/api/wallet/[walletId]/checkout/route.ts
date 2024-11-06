import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";

interface Props {
  params: { walletId: string };
}

export async function POST(req: NextRequest, { params }: Props) {
  try {
    const user = await currentUser();
    const { transaction_id } = await req.json();

    if (
      !user ||
      !user.id ||
      !user.emailAddresses?.[0]?.emailAddress ||
      !transaction_id
    ) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const wallet = await prisma.wallet.findUnique({
      where: {
        id: params.walletId,
        isPublished: true,
      },
    });

    const purchase = await prisma.walletPurchase.findUnique({
      where: {
        userId_walletId: {
          userId: user.id,
          walletId: params.walletId,
        },
      },
    });

    if (purchase) {
      return NextResponse.json(
        { message: "انت مشترك بالفعل" },
        { status: 400 }
      );
    }

    if (!wallet) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    let stripeCustomer = await prisma.stripeCustomer.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    if (!stripeCustomer) {
      stripeCustomer = await prisma.stripeCustomer.create({
        data: {
          userId: user.id,
          stripeCustomerId: transaction_id,
        },
      });
    }

    await prisma.walletPurchase.create({
      data: {
        userId: user.id,
        walletId: params.walletId,
      },
    });

    return NextResponse.json({ message: "wallet opened" }, { status: 201 });
  } catch (error) {
    console.log("[WALLET_ID_CHECKOUT]", error);

    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
