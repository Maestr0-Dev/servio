import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const entries = await prisma.waitlist.findMany({
      orderBy: { createdAt: "desc" },
    });

    const total = entries.length;
    const verified = entries.filter((e) => e.verified).length;
    const pending = total - verified;

    return NextResponse.json({ total, verified, pending, entries });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
