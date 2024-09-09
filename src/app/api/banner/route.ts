import { auth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

export async function GET() {
  try {
    const banner = await prisma.banner.findFirst();

    if (!banner) {
      return NextResponse.json(
        { message: "banner not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(banner, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { userId } = auth();
    const values = await request.json();

    if (!userId || !isTeacher(userId)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const banner = await prisma.banner.findFirst();

    await prisma.banner.update({
      where: {
        id: banner?.id,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(banner, { status: 201 });
  } catch (error) {
    console.log("[COURSES]", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
