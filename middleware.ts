import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { HttpStatus } from "./constants/httpStatus";

const PUBLIC_PATHS = ["/", "/auth/sign-in", "/auth/register"];

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some((path) => pathname.startsWith(path));
}

function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not defined");
  return new TextEncoder().encode(secret);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  if (!token) {
    if (pathname.startsWith("/api")) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: HttpStatus.Unauthorized,
        headers: { "Content-Type": "application/json" },
      });
    }

    const loginUrl = new URL("/auth/sign-in", req.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    await jwtVerify(token, getJwtSecretKey());
    return NextResponse.next();
  } catch (err) {
    if (pathname.startsWith("/api")) {
      return new NextResponse(JSON.stringify({ error: "Invalid token" }), {
        status: HttpStatus.Unauthorized,
        headers: { "Content-Type": "application/json" },
      });
    }
    const loginUrl = new URL("/auth/sign-in", req.url);
    return NextResponse.redirect(loginUrl);
  }
}
