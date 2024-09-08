import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

interface Props {
  params: {
    recommendationId: string;
  };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  try {
    const { userId } = auth();
    const { recommendationId } = params;

    if (userId !== process.env.NEXT_PUBLIC_ADMIN_ID || !isTeacher(userId)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const ownRecommendation = await prisma.recommendation.findUnique({
      where: {
        id: recommendationId,
      },
    });

    if (!ownRecommendation) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const recommendation = await prisma.recommendation.findUnique({
      where: {
        id: recommendationId,
      },
    });

    if (!recommendation) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    if (
      !recommendation.title ||
      !recommendation.description ||
      !recommendation.imageUrl ||
      !recommendation.price
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const publishedRecommendation = await prisma.recommendation.update({
      where: {
        id: recommendationId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(publishedRecommendation, { status: 200 });
  } catch (error) {
    console.log("[recommendation_PUBLISH]", error);

    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
