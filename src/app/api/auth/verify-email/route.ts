import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/verify-email?error=missing-token", request.url));
  }

  try {
    const user = await prisma.user.findFirst({
      where: { verificationToken: token },
    });

    if (!user) {
      return NextResponse.redirect(new URL("/verify-email?error=invalid-token", request.url));
    }

    if (user.emailVerified) {
      return NextResponse.redirect(new URL("/verify-email?already=true", request.url));
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        verificationToken: null,
      },
    });

    return NextResponse.redirect(new URL("/verify-email?success=true", request.url));
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.redirect(new URL("/verify-email?error=server", request.url));
  }
}
