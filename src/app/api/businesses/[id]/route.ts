import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const business = await prisma.business.findFirst({
    where: { id, userId: session.user.id },
    include: { services: true },
  });

  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  return NextResponse.json(business);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const business = await prisma.business.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  const allowedFields = ["name", "aiPhoneNumber", "description", "liveUpdate", "telegramBotToken"];
  const updates: Record<string, string | null> = {};

  for (const field of allowedFields) {
    if (field in body) {
      updates[field] = body[field] || null;
    }
  }

  const updated = await prisma.business.update({
    where: { id },
    data: updates,
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const business = await prisma.business.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  await prisma.business.delete({ where: { id } });

  return NextResponse.json({ message: "Business deleted" });
}
