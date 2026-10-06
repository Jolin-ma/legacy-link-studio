import { NextResponse, type NextRequest } from "next/server";

const CHECKOUT_ENABLED = process.env.NEXT_PUBLIC_CHECKOUT_ENABLED === "true";
const GATED_PATHS = ["/start", "/checkout", "/gift"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    return checkAdminAuth(req);
  }

  if (!CHECKOUT_ENABLED && GATED_PATHS.includes(pathname)) {
    const url = req.nextUrl.clone(); // keeps the query string, so UTMs survive
    url.pathname = "/waitlist";
    return NextResponse.redirect(url, 307);
  }

  return NextResponse.next();
}

function checkAdminAuth(req: NextRequest) {
  const password = process.env.ADMIN_PASSWORD;
  if (password) {
    const header = req.headers.get("authorization") ?? "";
    const [scheme, encoded] = header.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = atob(encoded);
      const supplied = decoded.slice(decoded.indexOf(":") + 1);
      if (supplied === password) return NextResponse.next();
    }
  }
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Legacy Link admin"' },
  });
}

export const config = {
  matcher: ["/start", "/checkout", "/gift", "/admin/:path*"],
};
