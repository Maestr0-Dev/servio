import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendWhatsAppMessage, parseWebhookBody } from "@/lib/twilio";
import { getChatResponse } from "@/lib/whatsapp";

// In-memory chat history (per phone number per business)
const chatHistories = new Map<string, { role: "user" | "assistant"; content: string }[]>();

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ shop_id: string }> }
) {
  const { shop_id } = await params;

  try {
    const formData = await request.formData();
    const body = parseWebhookBody(formData as unknown as URLSearchParams);

    const { from, body: messageBody } = body;

    if (!from || !messageBody) {
      return new NextResponse("OK", { status: 200 });
    }

    // Find the business
    const business = await prisma.business.findUnique({
      where: { id: shop_id },
    });

    if (!business) {
      return new NextResponse("OK", { status: 200 });
    }

    // Get or create chat history
    const chatKey = `${shop_id}:${from}`;
    if (!chatHistories.has(chatKey)) {
      chatHistories.set(chatKey, []);
    }
    const history = chatHistories.get(chatKey)!;

    // Get AI response
    const response = await getChatResponse(
      shop_id,
      from,
      history,
      messageBody
    );

    // Update chat history
    history.push({ role: "user", content: messageBody });
    history.push({ role: "assistant", content: response });

    // Keep history manageable (last 20 messages)
    if (history.length > 20) {
      history.splice(0, history.length - 20);
    }

    // Send response via WhatsApp
    await sendWhatsAppMessage(from, response, shop_id);

    // Return TwiML response
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${response.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</Message>
</Response>`;

    return new NextResponse(twiml, {
      status: 200,
      headers: { "Content-Type": "text/xml" },
    });
  } catch (error) {
    console.error("WhatsApp webhook error:", error);
    return new NextResponse("OK", { status: 200 });
  }
}
