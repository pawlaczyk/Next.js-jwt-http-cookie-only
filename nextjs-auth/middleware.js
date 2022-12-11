// https://github.com/vercel/examples/blob/main/edge-functions/jwt-authentication/middleware.ts

import { NextResponse } from "next/server";

const verifyToken = (req) => {
  // TODO
  console.log("TODO");
  return true;
};

export const config = {
  //   matcher: ["/api/protected", "/protected"],
  matcher: ["/api/protected"],
};

export async function middleware(req) {
  // validate the user is authenticated
  //   const verifiedToken = await verifyAuth(req).catch((err) => {
  //     console.error(err.message);
  //   });

  const verifiedToken = verifyToken(req);

  if (!verifiedToken) {
    // if this an API request, respond with JSON
    if (req.nextUrl.pathname.startsWith("/api/")) {
      return new NextResponse(
        JSON.stringify({ error: { message: "authentication required" } }),
        { status: 401 }
      );
    }
    // otherwise, redirect to the set token page
    else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}
