import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { randomBytes } from "crypto";

async function sendVerificationEmail(email: string, token: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const verifyUrl = `${baseUrl}/api/waitlist/verify?token=${token}`;

  const logoUrl = `${baseUrl}/s.png`;

  const { error } = await resend.emails.send({
    from: "Servio <hello@servio-assist.uk>",
    to: email,
    reply_to: "servio.assist@gmail.com",
    subject: "Verify your email - Servio Waitlist",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <img src="${logoUrl}" alt="Servio" width="48" height="48" style="border-radius: 12px;" />
        </div>
        <h1 style="color: #171717; text-align: center;">Welcome to Servio!</h1>
        <p style="color: #525252; font-size: 16px; line-height: 1.5;">
          Thank you for joining our waitlist. You're one step closer to having a smart receptionist that lets you focus on what matters most — running your business.
        </p>
        <p style="color: #525252; font-size: 16px; line-height: 1.5;">
          Click the button below to verify your email and confirm your spot:
        </p>
        <div style="text-align: center; margin: 24px 0;">
          <a href="${verifyUrl}" style="display: inline-block; background-color: #171717; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold;">
            Verify Email
          </a>
        </div>
        <p style="color: #a3a3a3; font-size: 14px; margin-top: 32px; text-align: center;">
          If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    throw new Error(error.message || "Failed to send email");
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, action } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    const existing = await prisma.waitlist.findUnique({ where: { email } });

    if (existing) {
      if (existing.verified) {
        return NextResponse.json(
          { error: "This email is already verified. You're on the list!" },
          { status: 409 }
        );
      }

      if (action === "resend") {
        const verificationToken = randomBytes(32).toString("hex");
        await prisma.waitlist.update({
          where: { id: existing.id },
          data: { verificationToken },
        });
        await sendVerificationEmail(email, verificationToken);
        return NextResponse.json({ message: "Verification email resent" }, { status: 200 });
      }

      return NextResponse.json(
        {
          error: "Email already on the waitlist but not verified",
          code: "pending_verification",
          message: "Check your inbox or click resend to get a new link",
        },
        { status: 409 }
      );
    }

    const verificationToken = randomBytes(32).toString("hex");

    await prisma.waitlist.create({
      data: { email, verificationToken },
    });

    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json({ message: "Verification email sent" }, { status: 201 });
  } catch (error) {
    console.error("Waitlist signup error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
