import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

interface Props {
  params: {
    newsId: string;
  };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  try {
    const { userId } = auth();
    const { newsId } = params;

    if (userId !== process.env.NEXT_PUBLIC_ADMIN_ID) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const ownNews = await prisma.news.findUnique({
      where: {
        id: newsId,
      },
    });

    if (!ownNews) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const news = await prisma.news.findUnique({
      where: {
        id: newsId,
      },
    });

    if (!news) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const unpublishedNews = await prisma.news.update({
      where: {
        id: newsId,
      },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json(unpublishedNews, { status: 200 });
  } catch (error) {
    console.log("[NEWS_UNPUBLISH]", error);

    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
