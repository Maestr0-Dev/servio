import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { registerWebhook } from "@/lib/telegram";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { shopId, botToken } = await request.json();

  if (!shopId || !botToken) {
    return NextResponse.json({ error: "Shop ID and bot token are required" }, { status: 400 });
  }

  const business = await prisma.business.findFirst({
    where: { id: shopId, userId: session.user.id },
  });

  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  // Register webhook with Telegram
  const webhookResult = await registerWebhook(botToken, shopId);

  if (!webhookResult.ok) {
    return NextResponse.json(
      { error: "Failed to register webhook. Check your bot token." },
      { status: 400 }
    );
  }

  // Save token to DB
  await prisma.business.update({
    where: { id: shopId },
    data: { telegramBotToken: botToken },
  });

  return NextResponse.json({ message: "Telegram bot connected successfully" });
}
