import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

interface Props {
  params: {
    recommendationId: string;
  };
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const { userId } = auth();
    const { recommendationId } = params;

    if (!userId || !isTeacher(userId)) {
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

    const deletedRecommendation = await prisma.recommendation.delete({
      where: {
        id: recommendationId,
      },
    });

    return NextResponse.json(
      { message: "recommendation deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.log("[recommendation_ID_DELETE]", error);

    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: Props) {
  try {
    const { userId } = auth();
    const { recommendationId } = params;
    const values = await request.json();

    if (!userId || !isTeacher(userId)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const recommendation = await prisma.recommendation.update({
      where: {
        id: recommendationId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(recommendation, { status: 200 });
  } catch (error) {
    console.log("[recommendation_ID]", error);

    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params: { recommendationId } }: Props
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const recommendation = await prisma.recommendation.findUnique({
      where: {
        id: recommendationId,
      },
    });

    if (!recommendation) {
      return NextResponse.json(
        { message: "Recommendation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(recommendation, { status: 200 });
  } catch (error) {
    console.log("[Recommendation_ID]", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
