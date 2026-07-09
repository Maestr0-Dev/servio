import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; serviceId: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, serviceId } = await params;

  const business = await prisma.business.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  const service = await prisma.service.findFirst({
    where: { id: serviceId, businessId: id },
  });

  if (!service) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }

  await prisma.service.delete({ where: { id: serviceId } });

  return NextResponse.json({ message: "Service deleted" });
}
