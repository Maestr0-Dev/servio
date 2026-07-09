import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const businesses = await prisma.business.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(businesses);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name } = await request.json();

  if (!name || typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Business name is required" }, { status: 400 });
  }

  const business = await prisma.business.create({
    data: {
      userId: session.user.id,
      name: name.trim(),
    },
  });

  return NextResponse.json(business, { status: 201 });
}
