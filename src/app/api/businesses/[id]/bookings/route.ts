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

  const bookings = await prisma.booking.findMany({
    where: { businessId: id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(bookings);
}
