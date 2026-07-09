import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Vapi sends call info with the phone number
    const callPhoneNumber = body.call?.phoneNumber || body.call?.to || body.phoneNumber;

    if (!callPhoneNumber) {
      return NextResponse.json({ error: "Phone number not found" }, { status: 400 });
    }

    // Find the business by phone number
    const business = await prisma.business.findFirst({
      where: { aiPhoneNumber: callPhoneNumber },
      include: { services: true },
    });

    if (!business) {
      return NextResponse.json({
        message: "Business not found for this phone number.",
      });
    }

    // Build the services list
    const servicesList = business.services
      .map((s) => `- ${s.name}: $${s.price} (${s.durationMinutes} min)`)
      .join("\n");

    // Build the system prompt
    const systemPrompt = [
      `You are a smart receptionist for ${business.name}.`,
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
      `1. Greet the caller warmly and identify yourself as the receptionist for ${business.name}.`,
      `2. Ask what service they're interested in.`,
      `3. Ask for their preferred date and time.`,
      `4. Ask for their full name and phone number.`,
      `5. Once you have all the information (service, time, name, phone), use the book_rendezvous tool to create the booking.`,
      `6. Confirm the booking details with the caller before hanging up.`,
      `7. Be professional, friendly, and helpful.`,
    ]
      .filter(Boolean)
      .join("\n");

    return NextResponse.json({
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
        ],
      },
      tools: [
        {
          type: "function",
          function: {
            name: "book_rendezvous",
            description: "Book an appointment for the customer",
            parameters: {
              type: "object",
              properties: {
                service_name: {
                  type: "string",
                  description: "The name of the service the customer wants",
                },
                customer_name: {
                  type: "string",
                  description: "The full name of the customer",
                },
                customer_phone: {
                  type: "string",
                  description: "The phone number of the customer",
                },
                appointment_time: {
                  type: "string",
                  description: "The requested appointment date and time in ISO format",
                },
              },
              required: ["service_name", "customer_name", "customer_phone", "appointment_time"],
            },
          },
        },
      ],
    });
  } catch (error) {
    console.error("Voice inbound error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
