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

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function proxy(request: NextRequest) {
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
      request.nextUrl.pathname.startsWith("/staff/assign-drivers") &&
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