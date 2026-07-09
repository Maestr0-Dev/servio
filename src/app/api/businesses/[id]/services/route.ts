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
  });

  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  const services = await prisma.service.findMany({
    where: { businessId: id },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(services);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { name, price, durationMinutes } = await request.json();

  if (!name || price === undefined || !durationMinutes) {
    return NextResponse.json({ error: "Name, price, and duration are required" }, { status: 400 });
  }

  const business = await prisma.business.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  const service = await prisma.service.create({
    data: {
      businessId: id,
      name,
      price: parseFloat(price),
      durationMinutes: parseInt(durationMinutes),
    },
  });

  return NextResponse.json(service, { status: 201 });
}
