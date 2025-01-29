import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

const locales = ['de','en','fi'];
const defaultLocale = locales[0];

const getLocale = (request: NextRequest) => {
  const headers = request.headers;
  const acceptLanguage = headers.get("Accept-Language");
  if (acceptLanguage) {
    const match = acceptLanguage.match(/^[a-z]{2}/);
    if (match) {
      return locales.includes(match[0]) ? match[0] : defaultLocale;
    }
  }
  return defaultLocale;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  console.log(pathname, pathnameHasLocale);

  if (pathnameHasLocale) {
    return await updateSession(request);
  }

  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // Create a new response that combines the session cookies with the redirect
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};