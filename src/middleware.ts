import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const basicAuth = request.headers.get("authorization");

  if (!basicAuth) {
    return new NextResponse(null, {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  const [user, pwd] = atob(basicAuth.split(" ")[1]).split(":");

  // ss = supersecret
  if (user === "admin" && pwd === "ss") {
    return NextResponse.next();
  }

  return new NextResponse(null, {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
