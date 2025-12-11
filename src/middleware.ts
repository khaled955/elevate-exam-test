import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // this is jwt token as it need request as aparameter
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });
  const { pathname } = request.nextUrl;

  const publicPaths = ["/login-form", "/register-form", "/forget-password"];

  const isPublic = publicPaths.some(
    (p) => pathname === p || pathname.startsWith(p)
  );

  // setting link which user need to enter before authentication to make redirect after authentication

  if (!token && !isPublic) {
    const redirectUrl = new URL("/login-form", request.nextUrl.origin);
    redirectUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);

    return NextResponse.redirect(new URL(redirectUrl));
  }

  if (token && isPublic)
    return NextResponse.redirect(new URL("/", request.nextUrl.origin));

  if (token && !isPublic) return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
