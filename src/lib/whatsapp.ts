import { prisma } from "./prisma";

const GROQ_API_KEY = process.env.GROQ_API_KEY;

export async function getChatResponse(
  businessId: string,
  customerPhone: string,
  messageHistory: { role: "user" | "assistant"; content: string }[],
  userMessage: string
): Promise<string> {
  const business = await prisma.business.findUnique({
    where: { id: businessId },
    include: { services: true },
  });

  if (!business) {
    return "Sorry, I couldn't find your business information. Please try again later.";
  }

  const servicesList = business.services
    .map((s) => `- ${s.name}: $${s.price} (${s.durationMinutes} min)`)
    .join("\n");

  const systemPrompt = [
    `You are a smart receptionist for ${business.name} on WhatsApp.`,
    ``,
    `Business Information:`,
    business.description || "No description provided.",
    ``,
    business.liveUpdate ? `Important Notice: ${business.liveUpdate}` : "",
    ``,
    `Services Available:`,
    servicesList || "No services listed.",
    ``,
    `Instructions:`,
    `1. Greet the customer warmly.`,
    `2. Ask what service they're interested in.`,
    `3. Ask for their preferred date and time.`,
    `4. Ask for their full name.`,
    `5. Once you have all the information, confirm the booking details.`,
    `6. Tell them the owner will confirm shortly.`,
    `7. Be concise and friendly — WhatsApp messages should be short.`,
    `8. Use simple language, avoid long paragraphs.`,
    `9. If the customer wants to book, ask for: service, date/time, name.`,
    `10. Format your responses clearly with line breaks.`,
  ]
    .filter(Boolean)
    .join("\n");

  // Build messages for Groq API
  const messages = [
    { role: "system" as const, content: systemPrompt },
    ...messageHistory.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
    { role: "user" as const, content: userMessage },
  ];

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages,
          max_tokens: 500,
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "I'm sorry, I didn't understand that. Could you rephrase?";
  } catch (error) {
    console.error("Groq response error:", error);
    return "I'm having trouble responding right now. Please try again in a moment.";
  }
}

export function parseBookingIntent(message: string) {
  const lowerMessage = message.toLowerCase();
  const bookingKeywords = ["book", "appointment", "schedule", "reserve", "rendezvous"];
  const isBookingRequest = bookingKeywords.some((kw) => lowerMessage.includes(kw));
  return { isBookingRequest, message: lowerMessage };
}
