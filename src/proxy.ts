import { type NextRequest, NextResponse } from "next/server";

/**
 * First line of defence for /admin: requests without a session cookie are
 * sent to the login page. The cookie's signature is verified on the server
 * in every admin page and action (`requireAdmin`).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();
  if (!request.cookies.has("skt_admin")) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    return NextResponse.redirect(url);
  }
  const res = NextResponse.next();
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};
