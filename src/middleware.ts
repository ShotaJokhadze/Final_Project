import { NextResponse, NextRequest } from "next/server";
import { createClient } from "./utils/supabase/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";


const nextIntlMiddleware = createMiddleware(routing);

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  nextIntlMiddleware(req);

  // Initialize Supabase client
  const supabase = createClient();
  
  // Get session from Supabase
  const { data, error } = await (await supabase).auth.getSession();
  
  // Check if data is present and session is not null
  const session = data?.session;
  
  const isLoginPage = req.nextUrl.pathname.includes("/login");
  const isRestrictedPage = [
    "/contact",
    "/profile",
    "/blogs",
    "/about",
    "/products",
  ].some((path) => req.nextUrl.pathname.includes(path));

  // If no session and the user is trying to access a restricted page, redirect to login
  if (!session && !isLoginPage && isRestrictedPage) {
    const locale = req.nextUrl.pathname.startsWith("/ka") ? "ka" : "en";
    const loginUrl = new URL(`/${locale}/login`, req.url);
    return NextResponse.redirect(loginUrl); // Redirect to login page
  }

  // Redirect to default locale if not already in /en or /ka
  if (
    !req.nextUrl.pathname.startsWith("/en") &&
    !req.nextUrl.pathname.startsWith("/ka")
  ) {
    const defaultLocale = "en";
    const redirectUrl = new URL(
      `/${defaultLocale}${req.nextUrl.pathname}`,
      req.url
    );
    return NextResponse.redirect(redirectUrl); // Redirect to default locale
  }

  return res; // Continue to the requested page
}

export const config = {
  matcher: ["/", "/(ka|en)/:path*"], // Match all paths for both English and Georgian locales
};