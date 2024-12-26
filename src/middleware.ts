import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Initialize the intlMiddleware
const intlMiddleware = createIntlMiddleware(routing);

// Define public routes that should not be localized
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/api/webhooks(.*)"]);

async function combinedMiddleware(req: NextRequest, event: NextFetchEvent) {
  // Skip the next-intl middleware for public routes (sign-in, sign-up)
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Run the intlMiddleware for non-public routes
  const intlResponse = intlMiddleware(req);
  if (intlResponse) return intlResponse;

  // Run the clerkMiddleware for protected routes
  const clerkHandler = clerkMiddleware(
    async (auth, request) => {
      if (!isPublicRoute(request)) {
        await auth.protect();
      }
    },
    {
      signInUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
      signUpUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
      afterSignInUrl: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
      afterSignUpUrl: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
    }
  );
  const clerkResponse = await clerkHandler(req, event);
  if (clerkResponse) return clerkResponse;

  // If no middleware returned a response, continue with the next response
  return NextResponse.next();
}

export default combinedMiddleware;

export const config = {
  matcher: [
    // Match for internationalized pathnames
    "/",
    "/(ar|en)/:path*",
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
