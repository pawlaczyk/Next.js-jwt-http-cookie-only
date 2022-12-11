// https://github.com/vercel/examples/blob/main/edge-functions/jwt-authentication/lib/auth.ts
import { SignJWT, jwtVerify } from "jose";
import { nanoid } from "nanoid";

import { serialize } from "cookie";

const JWT_SECRET = process.env.JWT_SECRET || "ALA MA KOTAłka";
const COOKIE_PUBLIC_NAME = "wuzetkaJWT";

export default async function handler(req, res) {
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(new TextEncoder().encode(JWT_SECRET));

  const serialised = serialize(COOKIE_PUBLIC_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  res.setHeader("Set-Cookie", serialised);
  res.status(200).json({ message: "Success!", token: token });
}
