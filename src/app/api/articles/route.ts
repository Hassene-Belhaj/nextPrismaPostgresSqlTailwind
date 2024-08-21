import prisma from "@/utils/prismaDb";
import { VerifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

interface Iarticle {
  title: string;
  description: string;
}

/*
 @method  POST
 @route   ~/api/articles
 @desc    create new article
 @access  private only admin
 */

export async function POST(request: NextRequest) {
  const { title, description } = (await request.json()) as Iarticle;
  try {

    const user = VerifyToken(request)

    if(user === null || user.isAdmin !== true) return NextResponse.json({message : "Sorry only admin can post a New Article"} , {status : 403})
    if (!title || !description) return NextResponse.json({ message: "please fill all requested fields" }, { status: 400 });
    const createArticle = await prisma.article.create({
      data: {
        title,
        description,
      },
    });
    return NextResponse.json({ message: "Article created with success", data: createArticle }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

/*
 @method  GET
 @route   ~/api/articles
 @desc    get articles by page number
 @access  public
 */

export async function GET(request: NextRequest) {
  try {
    const Page = request.nextUrl.searchParams.get("page") || "1";

    const Article_Per_Page = 9;                            //*
    let Skip = Article_Per_Page * (parseInt(Page) - 1);   //*

    const allArticles = await prisma.article.findMany({ skip: Skip, take: Article_Per_Page });

    if (!allArticles) return NextResponse.json({ message: "not found" }, { status: 404 });
    return NextResponse.json(allArticles, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
