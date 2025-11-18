import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("customer_token")?.value;

  // daftar halaman yang butuh login
  const protectedRoutes = ["/wishlist", "/profile", "/checkout", "/orders"];

  const { pathname } = req.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    // redirect jika belum login
    const loginUrl = new URL("/", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/wishlist/:path*",
    "/profile/:path*",
    "/checkout/:path*",
    "/orders/:path*",
  ],
};
