import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendBookingNotification } from "@/lib/telegram";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { arguments: args } = body;

    if (!args) {
      return NextResponse.json({ error: "No arguments provided" }, { status: 400 });
    }

    const { service_name, customer_name, customer_phone, appointment_time } = args;

    if (!service_name || !customer_name || !customer_phone || !appointment_time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Find the business by phone number from the call context
    const callPhoneNumber = body.call?.phoneNumber || body.call?.to || body.phoneNumber;

    let business;
    if (callPhoneNumber) {
      business = await prisma.business.findFirst({
        where: { aiPhoneNumber: callPhoneNumber },
        include: { services: true },
      });
    }

    if (!business) {
      // Fallback: get the first business with a telegram bot
      business = await prisma.business.findFirst({
        where: { telegramBotToken: { not: null } },
        include: { services: true },
      });
    }

    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    // Create the booking
    const booking = await prisma.booking.create({
      data: {
        businessId: business.id,
        customerName: customer_name,
        customerPhone: customer_phone,
        serviceName: service_name,
        appointmentTime: new Date(appointment_time),
        status: "pending",
      },
    });

    // Send Telegram notification if bot is configured
    if (business.telegramBotToken && business.telegramChatId) {
      try {
        await sendBookingNotification(
          business.telegramBotToken,
          business.telegramChatId,
          {
            id: booking.id,
            customerName: booking.customerName,
            customerPhone: booking.customerPhone,
            serviceName: booking.serviceName,
            appointmentTime: booking.appointmentTime.toISOString(),
          }
        );
      } catch (telegramError) {
        console.error("Failed to send Telegram notification:", telegramError);
      }
    }

    return NextResponse.json({
      result: `Booking confirmed for ${customer_name}. A ${service_name} appointment has been scheduled for ${new Date(appointment_time).toLocaleString()}. The owner will review and confirm shortly.`,
    });
  } catch (error) {
    console.error("Book tool error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
