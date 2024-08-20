import jwt from "jsonwebtoken";
import { Ijwtpayload } from "./types/Types";
import { serialize } from "cookie";

// generate jwt token
export function generateToken(JwtPayload: Ijwtpayload) {
  const token = jwt.sign(JwtPayload, process.env.SECRETJWT as string, {
    expiresIn: "3d",
  });
  return token;
}

// set cookie with jwt
export function setCookie(JwtPayload: Ijwtpayload): string {
  const token = generateToken(JwtPayload);
  const cookie = serialize("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 3, // 3 days ,
    path: "/",
  });
  return cookie;
}
