import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { type UserRole } from "types";
import { clerkClient } from "@clerk/nextjs";
import { authMiddleware } from "@clerk/nextjs/server";
export async function middleware(request: NextRequest) {
  const reqHeaders: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Basic ${Buffer.from(
      // rome-ignore lint/style/noNonNullAssertion: <explanation>
      process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY!
    ).toString("base64")}`,
  };

  const session = request.cookies.get("swell-session");
  const locale = request.cookies.get("swell-locale");
  const currency = request.cookies.get("swell-currency");

  if (session) {
    reqHeaders["X-Session"] = session.value;
  }

  if (locale) {
    reqHeaders["X-Locale"] = locale.value;
  }

  if (currency) {
    reqHeaders["X-Currency"] = currency.value;
  }

  const redirectUrl = new URL("/signin", request.url);
  redirectUrl.searchParams.set("redirectTo", request.nextUrl.href);
  const response = NextResponse.redirect(redirectUrl);

  try {
    const swellResponse = await fetch(
      `${process.env.SWELL_API_ENDPOINT}/account`,
      {
        method: "get",
        headers: reqHeaders,
        credentials: "include",
        mode: "cors",
      }
    );

    const account = await swellResponse.json();

    if (!account) {
      return response;
    }

    // const r = NextResponse.next()
    // r.headers.set(
    //   'X-Account',
    //   Buffer.from(JSON.stringify(account), 'utf8').toString('base64')
    // )
    // return r
    return NextResponse.next();
  } catch (error) {
    console.error(error);
    response.cookies.delete("swell-session");
  }

  return response;
}
export default authMiddleware({
  // Public routes are routes that don't require authentication
  publicRoutes: [
    "/",
    "/signin(.*)",
    "/signup(.*)",
    "/sso-callback(.*)",
    "/api(.*)",
    "/categories(.*)",
    "/products(.*)",
    "/build-a-board(.*)",
  ],
  async afterAuth(auth, req) {
    if (auth.isPublicRoute) {
      //  For public routes, we don't need to do anything
      return NextResponse.next();
    }

    const url = new URL(req.nextUrl.origin);

    if (!auth.userId) {
      //  If user tries to access a private route without being authenticated,
      //  redirect them to the sign in page
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }

    // Set the user's role to user if it doesn't exist
    const user = await clerkClient.users.getUser(auth.userId);

    if (!user) {
      throw new Error("User not found.");
    }

    // If the user doesn't have a role, set it to user
    if (!user.privateMetadata.role) {
      await clerkClient.users.updateUser(auth.userId, {
        privateMetadata: {
          ...user.privateMetadata,
          role: "user" satisfies UserRole,
        },
      });
    }
  },
});

export const config = {
  matcher: ["/profile/:path*", "/((?!.*\\..*|_next).*)"],
};
