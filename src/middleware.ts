import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Middleware disabled for now - will re-enable after auth is confirmed working
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/businesses"],
};
