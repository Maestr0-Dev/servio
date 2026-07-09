import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { editMessage, answerCallbackQuery } from "@/lib/telegram";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ shop_id: string }> }
) {
  const { shop_id } = await params;

  try {
    const body = await request.json();

    // Telegram sends different types of updates
    if (!body.callback_query) {
      return NextResponse.json({ ok: true });
    }

    const { callback_query } = body;
    const { data, message, id: callbackQueryId } = callback_query;

    if (!data || !message) {
      return NextResponse.json({ ok: true });
    }

    // Parse callback data: "approve_booking:<id>" or "reject_booking:<id>"
    const match = data.match(/^(approve|reject)_booking:(.+)$/);
    if (!match) {
      return NextResponse.json({ ok: true });
    }

    const [, action, bookingId] = match;
    const chatId = message.chat.id;
    const messageId = message.message_id;

    // Find the business for this shop_id to get the bot token
    const business = await prisma.business.findUnique({
      where: { id: shop_id },
    });

    if (!business || !business.telegramBotToken) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    const botToken = business.telegramBotToken;

    // Find the booking
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      await answerCallbackQuery(botToken, callbackQueryId, "Booking not found");
      return NextResponse.json({ ok: true });
    }

    if (booking.status !== "pending") {
      await answerCallbackQuery(botToken, callbackQueryId, "Already processed");
      return NextResponse.json({ ok: true });
    }

    const newStatus = action === "approve" ? "confirmed" : "rejected";

    // Update booking status
    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: newStatus },
    });

    // Edit the Telegram message to show result
    const statusEmoji = action === "approve" ? "✅" : "❌";
    const statusText = action === "approve" ? "Approved" : "Rejected";

    const updatedText = [
      `${statusEmoji} *Booking ${statusText}*`,
      ``,
      `*Customer:* ${booking.customerName}`,
      `*Phone:* ${booking.customerPhone}`,
      `*Service:* ${booking.serviceName}`,
      `*Time:* ${booking.appointmentTime.toLocaleString()}`,
    ].join("\n");

    await editMessage(botToken, chatId, messageId, updatedText);
    await answerCallbackQuery(
      botToken,
      callbackQueryId,
      `Booking ${statusText}`
    );

    // TODO: Send SMS to customer (Twilio integration)
    // if (newStatus === "confirmed") {
    //   await sendConfirmation(booking.customerPhone, booking);
    // } else {
    //   await sendRejection(booking.customerPhone, booking);
    // }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Telegram webhook error:", error);
    return NextResponse.json({ ok: true });
  }
}
