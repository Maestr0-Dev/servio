import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";

function getBaseUrl(request: NextRequest) {
  const origin = request.headers.get("origin") || request.headers.get("host");
  const protocol = request.headers.get("x-forwarded-proto") || "https";
  return origin ? `${protocol}://${origin}` : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
}

async function sendVerificationEmail(name: string, email: string, token: string, baseUrl: string) {
  const verifyUrl = `${baseUrl}/api/auth/verify-email?token=${token}`;
  const logoUrl = `${baseUrl}/s.png`;

  console.log("Sending verification email to:", email, "URL:", verifyUrl);
  const { data, error } = await resend.emails.send({
    from: "Servio <hello@servio-assist.uk>",
    to: email,
    replyTo: "servio.assist@gmail.com",
    subject: "Verify your email - Servio",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <img src="${logoUrl}" alt="Servio" width="48" height="48" style="border-radius: 12px;" />
        </div>
        <h1 style="color: #171717; text-align: center;">Welcome to Servio!</h1>
        <p style="color: #525252; font-size: 16px; line-height: 1.5;">
          Hi ${name}, thanks for creating your account. Please verify your email to get started.
        </p>
        <div style="text-align: center; margin: 24px 0;">
          <a href="${verifyUrl}" style="display: inline-block; background-color: #171717; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold;">
            Verify Email
          </a>
        </div>
        <p style="color: #a3a3a3; font-size: 14px; margin-top: 32px; text-align: center;">
          If you didn't create this account, you can safely ignore this email.
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("Email send error:", error);
  } else {
    console.log("Email sent successfully, ID:", data?.id);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();
    const baseUrl = getBaseUrl(request);

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing && !existing.emailVerified) {
      const newToken = randomBytes(32).toString("hex");
      await prisma.user.update({
        where: { id: existing.id },
        data: { verificationToken: newToken },
      });
      await sendVerificationEmail(existing.name || "User", email, newToken, baseUrl);
      return NextResponse.json({
        message: "Verification email resent. Please check your inbox.",
      }, { status: 200 });
    }

    if (existing && existing.emailVerified) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const verificationToken = randomBytes(32).toString("hex");

    const user = await prisma.user.create({
      data: { name, email, passwordHash, verificationToken },
    });

    await sendVerificationEmail(name, email, verificationToken, baseUrl);

    return NextResponse.json({
      message: "Account created",
      user: { id: user.id, name: user.name, email: user.email },
    }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An error occurred while creating your account. Please try again." },
      { status: 500 }
    );
  }
}
