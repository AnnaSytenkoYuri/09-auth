import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { cookies } from "next/headers";
import { parse } from "cookie";
import { checkServerSession } from "./lib/api/serverApi";

const privateRoutes = ["/notes", "/profile"];
const authRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isPrivateRoute) {
    if (accessToken) {
      return NextResponse.next();
    }

    if (refreshToken) {
      try {
        const data = await checkServerSession();
        const setCookie = data.headers["set-cookie"];

        if (setCookie) {
          const response = NextResponse.next();
          const lines = Array.isArray(setCookie) ? setCookie : [setCookie];
          const tokenNames = ["accessToken", "refreshToken"] as const;

          for (const line of lines) {
            const parsed = parse(line);

            for (const name of tokenNames) {
              const val = parsed[name];
              if (val) {
                response.cookies.set(name, val, {
                  path: parsed.Path || "/",
                  httpOnly: true,
                  sameSite: "lax",
                  secure: process.env.NODE_ENV === "production",
                  expires: parsed.Expires
                    ? new Date(parsed.Expires)
                    : undefined,
                  maxAge: parsed["Max-Age"]
                    ? Number(parsed["Max-Age"])
                    : undefined,
                });
              }
            }
          }

          return response;
        }
      } catch (error) {
        console.error("Session refresh failed:", error);
      }
    }

    const loginUrl = new URL("/sign-in", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
