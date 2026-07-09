import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendWhatsAppMessage } from "@/lib/twilio";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { to, message, shopId } = await request.json();

  if (!to || !message) {
    return NextResponse.json({ error: "Phone number and message are required" }, { status: 400 });
  }

  try {
    const result = await sendWhatsAppMessage(to, message, shopId);
    return NextResponse.json({ success: true, sid: result.sid });
  } catch (error) {
    console.error("WhatsApp send error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
