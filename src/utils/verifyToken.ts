import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { Ijwtpayload } from "./types/Types";

export function VerifyToken(request: NextRequest): Ijwtpayload | null {
  try {
    const access_token = request.cookies.get("access_token");
    const token = access_token?.value;
    if (!token) {
      return null;
    }

    const user = jwt.verify(token, process.env.SECRETJWT as string) as Ijwtpayload;

    return user;
  } catch (error) {
    return null;
  }
}


//*
export function VerifyTokenPage(token: string): Ijwtpayload | null {
  try {
    const user = jwt.verify(token, process.env.SECRETJWT as string) as Ijwtpayload;
    if (!user) return null;
    return user;
  } catch (error) {
    return null;
  }
}
