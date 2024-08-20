import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prismaDb";


/*
 @method  GET
 @route   ~/api/articles/search?searchText=?
 @desc    get by search article(s)
 @access  public
 */

export async function GET(request: NextRequest) {
  try {
    let articles;
    const searchText = request.nextUrl.searchParams.get("searchText");
    if (searchText) {
      articles = await prisma.article.findMany({
        where: {
          title: {
            // equals: searchText,
            contains : searchText ,
            mode: "insensitive",
          },
        },
      });
    } else {
      articles = await prisma.article.findMany({ take: 6 });
    }
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
