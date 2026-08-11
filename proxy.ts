import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

interface DecodedToken {
  id: string;
  fullName: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

const ALLOWED_STAFF_ROLES = ["superadmin", "admin"];
const PUBLIC_PATHS = ["/staff/login", "/staff/register"];

const SUPERADMIN_ONLY_PATHS = ["/staff/assign-drivers", "/staff/user-management"];

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;
  const loginUrl = new URL("/staff/login", request.url);
  const staffHomeUrl = new URL("/staff", request.url);
  const pendingUrl = new URL("/pending-approval", request.url);

  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });
    const decoded = payload as unknown as DecodedToken;

    if (decoded.role === "user") {
      return NextResponse.redirect(pendingUrl);
    }

    if (!ALLOWED_STAFF_ROLES.includes(decoded.role)) {
      return NextResponse.redirect(loginUrl);
    }

    if (
      SUPERADMIN_ONLY_PATHS.some((path) => pathname.startsWith(path)) &&
      decoded.role !== "superadmin"
    ) {
      return NextResponse.redirect(staffHomeUrl);
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Proxy JWT verify failed:", error);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/staff/:path*"],
};