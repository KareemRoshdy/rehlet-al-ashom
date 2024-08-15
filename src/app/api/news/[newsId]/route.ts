import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

interface Props {
  params: {
    newsId: string;
  };
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const { userId } = auth();
    const { newsId } = params;

    if (!userId || !isTeacher(userId)) {
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

    const deletedNews = await prisma.news.delete({
      where: {
        id: newsId,
      },
    });

    return NextResponse.json({ message: "news deleted" }, { status: 200 });
  } catch (error) {
    console.log("[NEWS_ID_DELETE]", error);

    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: Props) {
  try {
    const { userId } = auth();
    const { newsId } = params;
    const values = await request.json();

    if (!userId || !isTeacher(userId)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const news = await prisma.news.update({
      where: {
        id: newsId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    console.log("[NEWS_ID]", error);

    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
