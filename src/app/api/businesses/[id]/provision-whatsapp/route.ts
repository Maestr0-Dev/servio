import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { provisionWhatsAppNumber } from "@/lib/twilio";

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

    if (business.whatsappNumber && business.whatsappSid) {
      return NextResponse.json({
        whatsappNumber: business.whatsappNumber,
        message: "WhatsApp number already provisioned",
      });
    }

    const { phoneNumber, sid } = await provisionWhatsAppNumber(id);

    await withRetry(() =>
      prisma.business.update({
        where: { id },
        data: {
          whatsappNumber: phoneNumber,
          whatsappSid: sid,
        },
      })
    );

    return NextResponse.json({
      whatsappNumber: phoneNumber,
      message: "WhatsApp number provisioned successfully",
    });
  } catch (error) {
    console.error("WhatsApp provisioning error:", error);
    return NextResponse.json(
      { error: "Failed to provision WhatsApp number. Please try again." },
      { status: 500 }
    );
  }
}
