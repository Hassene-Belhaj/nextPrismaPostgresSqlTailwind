import { Ijwtpayload, IRegister } from "@/utils/types/Types";
import prisma from "@/utils/prismaDb";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import {setCookie } from "@/utils/generateToken";

/* 
@method 
@route ~/api/users/signup
desc   create new user
access   public
*/

const registerUserValidationSchema = z.object({
  email: z.string().min(3, "email must contain at least 3 characters").max(100).email(),
  username: z.string().min(5, "user must contain at least 5 characters").max(100),
  password: z.string().min(6),
});

export async function POST(request: NextRequest) {
  const { email, username, password } = (await request.json()) as IRegister;
  //    const validation = registerUserValidationSchema.safeParse({email,username,password}) ;
  //    if(!validation.success) {
  //     return NextResponse.json({message : validation.error.errors[0].message} , {status : 400})
  //    }
  try {
    if (!email || !username || !password) {
      return NextResponse.json({ message: "please fill all requested fields" }, { status: 400 });
    }
    const isExistEmail = await prisma.user.findUnique({ where: { email: email } });
    if (isExistEmail) {
      return NextResponse.json({ message: "address email already exists please sign in Instead" }, { status: 400 });
    }
    const isExistUsername = await prisma.user.findUnique({ where: { username: username } });
    if (isExistUsername) {
      return NextResponse.json({ message: "username already exists please try another" }, { status: 400 });
    }

    const Salt = bcrypt.genSaltSync(10);
    const pwdCrypt = bcrypt.hashSync(password, Salt);

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: pwdCrypt,
      },
      select: {
        id: true,
        email: true,
        username: true,
        isAdmin: true,
      },
    });

    //*
    // const JwtPayload: Ijwtpayload = {
    //   id: newUser.id,
    //   email: newUser.email,
    //   isAdmin: newUser.isAdmin,
    // };

    // const cookie = setCookie(JwtPayload);
    //*

    // return NextResponse.json({ message: "user created with success ", newUser }, { status: 201 , headers : {"set-cookie" : cookie}});
    return NextResponse.json({ message: "user created with success ", newUser }, { status: 201});
  } catch (error) {
    return NextResponse.json({ message: "internal server error" }, { status: 500 });
  }
}
