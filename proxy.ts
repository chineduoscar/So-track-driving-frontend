import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: string;
  fullName: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const loginUrl = new URL("/admin-login", request.url);

  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string, {
      algorithms: ["HS256"],
    }) as DecodedToken;

    if (decoded.role !== "admin") {
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Proxy JWT verify failed:", error);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/admin/:path*"],
  runtime: "nodejs",
};