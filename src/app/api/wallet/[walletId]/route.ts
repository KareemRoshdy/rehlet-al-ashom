import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

interface Props {
  params: {
    walletId: string;
  };
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const { userId } = auth();
    const { walletId } = params;

    if (userId !== process.env.NEXT_PUBLIC_ADMIN_ID || !isTeacher(userId)) {
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

    const deletedWallet = await prisma.wallet.delete({
      where: {
        id: walletId,
      },
    });

    return NextResponse.json({ message: "wallet deleted" }, { status: 200 });
  } catch (error) {
    console.log("[WALLET_ID_DELETE]", error);

    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: Props) {
  try {
    const { userId } = auth();
    const { walletId } = params;
    const values = await request.json();

    if (userId !== process.env.NEXT_PUBLIC_ADMIN_ID || !isTeacher(userId)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const wallet = await prisma.wallet.update({
      where: {
        id: walletId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(wallet, { status: 200 });
  } catch (error) {
    console.log("[WALLET_ID]", error);

    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params: { walletId } }: Props
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const wallet = await prisma.wallet.findUnique({
      where: {
        id: walletId,
      },
    });

    if (!wallet) {
      return NextResponse.json(
        { message: "Wallet not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(wallet, { status: 200 });
  } catch (error) {
    console.log("[Wallet_ID]", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
