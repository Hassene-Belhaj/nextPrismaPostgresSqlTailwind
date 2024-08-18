import { Ijwtpayload, ILogin } from "@/utils/types/Types";
import prisma from "@/utils/prismaDb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { setCookie } from "@/utils/generateToken";

/* 
@method 
@route ~/api/users/signin
desc    sign in
access   public
*/

export async function POST(request: NextRequest) {
  const { email, password } = (await request.json()) as ILogin;
  try {
    if (!email || !password) return NextResponse.json({ message: "please fill all requested fields" }, { status: 400 });
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 403 });
    }
    const pwdDecrpyt = await bcrypt.compare(password, user.password);
    if (!pwdDecrpyt) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
    }

    //*
    const JwtPayload: Ijwtpayload = {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    const cookie = setCookie(JwtPayload);

    //*
    return NextResponse.json({ message: "sign in with success" }, { status: 200, headers: { "Set-Cookie": cookie } });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
