// https://github.com/vercel/examples/blob/main/edge-functions/jwt-authentication/lib/auth.ts
import { SignJWT, jwtVerify } from "jose";
import { nanoid } from "nanoid";

import { serialize } from "cookie";

const JWT_SECRET = process.env.JWT_SECRET || "ALA MA KOTAłka";
const COOKIE_PUBLIC_NAME = "wuzetkaJWT";

export default async function handler(req, res) {
  const { cookies } = req;
  console.log("cookies: ", cookies);

  const token = cookies[COOKIE_PUBLIC_NAME];
  console.log("token: ");

  if (!token) {
    res.status(200).json({ message: "Brak token :< ", token: null });
    return;
  }

  //   walidacja tokenu
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );

    res.status(200).json({
      message: "walidacja tokena poszła git",
      token: token,
      verified: verified,
    });
  } catch (err) {
    res.status(200).json({
      message:
        ":< twój token nie przeszedł weryfikacji =  wygasł prawdopodobnie",
      error: err,
    });
    return;
  }
}
