const TELEGRAM_API = "https://api.telegram.org";

export async function registerWebhook(botToken: string, shopId: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const webhookUrl = `${baseUrl}/api/telegram/webhook/${shopId}`;

  const res = await fetch(`${TELEGRAM_API}/bot${botToken}/setWebhook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: webhookUrl }),
  });

  const data = await res.json();
  return data;
}

export async function sendBookingNotification(
  botToken: string,
  chatId: string,
  booking: {
    id: string;
    customerName: string;
    customerPhone: string;
    serviceName: string;
    appointmentTime: string;
  }
) {
  const message = [
    `*New Booking Request*`,
    ``,
    `*Customer:* ${booking.customerName}`,
    `*Phone:* ${booking.customerPhone}`,
    `*Service:* ${booking.serviceName}`,
    `*Time:* ${booking.appointmentTime}`,
  ].join("\n");

  const keyboard = {
    inline_keyboard: [
      [
        { text: "✅ Approve", callback_data: `approve_booking:${booking.id}` },
        { text: "❌ Reject", callback_data: `reject_booking:${booking.id}` },
      ],
    ],
  };

  const res = await fetch(`${TELEGRAM_API}/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "Markdown",
      reply_markup: keyboard,
    }),
  });

  return await res.json();
}

export async function editMessage(
  botToken: string,
  chatId: string,
  messageId: number,
  text: string
) {
  const res = await fetch(`${TELEGRAM_API}/bot${botToken}/editMessageText`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      message_id: messageId,
      text,
    }),
  });

  return await res.json();
}

export async function answerCallbackQuery(
  botToken: string,
  callbackQueryId: string,
  text?: string
) {
  const res = await fetch(`${TELEGRAM_API}/bot${botToken}/answerCallbackQuery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      callback_query_id: callbackQueryId,
      text,
    }),
  });

  return await res.json();
}
