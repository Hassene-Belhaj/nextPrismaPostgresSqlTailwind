import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prismaDb";

/*
@method   GET
@route    ~/api/articles/count
@desc     get Articles Count
@access   public
*/

export async function GET(request: NextRequest) {
  try {
    const count = await prisma.article.count();
    return NextResponse.json({count : count}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
