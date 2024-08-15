import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";

interface Props {
  params: { recommendationId: string };
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

    const recommendation = await prisma.daleyRecommendation.findUnique({
      where: {
        id: params.recommendationId,
        isPublished: true,
      },
    });

    const purchase = await prisma.daleyRecommendationPurchase.findUnique({
      where: {
        userId_daleyrecommendationId: {
          userId: user.id,
          daleyrecommendationId: params.recommendationId,
        },
      },
    });

    if (purchase) {
      return NextResponse.json(
        { message: "Already purchased" },
        { status: 400 }
      );
    }

    if (!recommendation) {
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

    await prisma.daleyRecommendationPurchase.create({
      data: {
        userId: user.id,
        daleyrecommendationId: params.recommendationId,
      },
    });

    return NextResponse.json(
      { message: "daily-recommendation opened" },
      { status: 201 }
    );
  } catch (error) {
    console.log("[DAILY_RECOMMENDATION_ID_CHECKOUT]", error);

    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
