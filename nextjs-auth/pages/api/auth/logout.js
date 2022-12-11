//github.com/pawlaczyk/Next.js-jwt-http-cookie-only/blob/main/nextjs-auth/pages/api/auth/logout.js
//github.com/vercel/examples/blob/main/edge-functions/jwt-authentication/lib/auth.ts

import { serialize } from "cookie";

const JWT_SECRET = process.env.JWT_SECRET || "ALA MA KOTAłka";
const COOKIE_PUBLIC_NAME = "wuzetkaJWT";

export default function handler(req, res) {
  const { cookies } = req;

  const jwt = cookies[COOKIE_PUBLIC_NAME];

  if (!jwt) {
    return res.json({ message: "Nie ma ciasteczka, - nie ma co usuwać ..." });
    return;
  }

  //   https://github.com/vercel/examples/blob/main/edge-functions/jwt-authentication/lib/auth.ts#L55
  const serialised = serialize(COOKIE_PUBLIC_NAME, null, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: -1,
    path: "/",
  });

  res.setHeader("Set-Cookie", serialised);

  res.status(200).json({ message: "Successfuly logged out!" });
}
