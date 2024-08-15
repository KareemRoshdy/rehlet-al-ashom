import { auth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    const { title } = await request.json();

    if (!userId || !isTeacher(userId)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const wallet = await prisma.wallet.create({
      data: {
        title,
      },
    });

    return NextResponse.json(wallet, { status: 201 });
  } catch (error) {
    console.log("[WALLET]", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
