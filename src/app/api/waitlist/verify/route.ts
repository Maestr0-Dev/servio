import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    const token = request.nextUrl.searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(`${baseUrl}/verify?error=missing-token`);
    }

    const entry = await prisma.waitlist.findFirst({
      where: { verificationToken: token },
    });

    if (!entry) {
      return NextResponse.redirect(`${baseUrl}/verify?error=invalid-token`);
    }

    if (entry.verified) {
      return NextResponse.redirect(`${baseUrl}/verify?already=true`);
    }

    await prisma.waitlist.update({
      where: { id: entry.id },
      data: { verified: true, verificationToken: null },
    });

    return NextResponse.redirect(`${baseUrl}/verify?success=true`);
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.redirect(`${baseUrl}/verify?error=server`);
  }
}
