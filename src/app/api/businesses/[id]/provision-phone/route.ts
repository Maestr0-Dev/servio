import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { provisionPhoneNumber, deletePhoneNumber } from "@/lib/vapi";

async function withRetry<T>(fn: () => Promise<T>, retries = 2): Promise<T> {
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries) throw error;
      await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
    }
  }
  throw new Error("Max retries exceeded");
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const business = await withRetry(() =>
      prisma.business.findFirst({
        where: { id, userId: session.user!.id },
      })
    );

    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    if (business.aiPhoneNumber && business.vapiPhoneNumberId) {
      return NextResponse.json({
        phoneNumber: business.aiPhoneNumber,
        message: "Phone number already provisioned",
      });
    }

    const { phoneNumberId, phoneNumber } = await provisionPhoneNumber(id);

    await withRetry(() =>
      prisma.business.update({
        where: { id },
        data: {
          aiPhoneNumber: phoneNumber,
          vapiPhoneNumberId: phoneNumberId,
        },
      })
    );

    return NextResponse.json({
      phoneNumber,
      message: "Phone number provisioned successfully",
    });
  } catch (error) {
    console.error("Phone provisioning error:", error);
    return NextResponse.json(
      { error: "Failed to provision phone number. Please try again." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const business = await withRetry(() =>
      prisma.business.findFirst({
        where: { id, userId: session.user!.id },
      })
    );

    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    if (!business.vapiPhoneNumberId) {
      return NextResponse.json({ error: "No phone number to delete" }, { status: 400 });
    }

    await deletePhoneNumber(business.vapiPhoneNumberId);

    await withRetry(() =>
      prisma.business.update({
        where: { id },
        data: {
          aiPhoneNumber: null,
          vapiPhoneNumberId: null,
        },
      })
    );

    return NextResponse.json({ message: "Phone number removed" });
  } catch (error) {
    console.error("Phone deletion error:", error);
    return NextResponse.json(
      { error: "Failed to remove phone number" },
      { status: 500 }
    );
  }
}
