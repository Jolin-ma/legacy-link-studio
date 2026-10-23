import { NextResponse, type NextRequest } from "next/server";

// The waitlist is retired — old links (bios, shared posts) go to the intake.
export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone(); // keeps the query string, so UTMs survive
  url.pathname = "/start";
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/waitlist", "/waitlist/:path*"],
};
