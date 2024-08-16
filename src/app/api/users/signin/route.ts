import { ILogin } from "@/utils/types/Types";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { email, password } = (await request.json()) as ILogin;
  try {
    if (!email || !password) return NextResponse.json({ message: "please fill all requested fields" }, { status: 400 });
    const resp = await prisma.user.findUnique({ where: { email: email } });
    if (!resp) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 403 });
    }
    const pwdDecrpyt = await bcrypt.compare(password, resp.password);
    if (!pwdDecrpyt) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
    }
    return NextResponse.json({ message: "sign in with success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
