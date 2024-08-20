import { IeditArticle, Iparams } from "@/utils/types/Types";
import { VerifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prismaDb";



export async function PUT(request: NextRequest, { params }: Iparams) {
  const { id } = params;
  const { newTitle, newDescription } = (await request.json()) as IeditArticle;
  try {
    const user = VerifyToken(request);
    if (user === null) return NextResponse.json({ message: "You are not authenticated , access denied" }, { status: 401 });
    if (user.isAdmin === false) return NextResponse.json({ message: "only Admin can Delete Article , access denied" }, { status: 403 });
    const findArticle = await prisma.article.findUnique({ where: { id: parseInt(id) } });
    if (!findArticle) return NextResponse.json({ message: "Article not found" });
    const editArticle = await prisma.article.update({
      where: { id: parseInt(id) },
      data: {
        title: newTitle || findArticle.title,
        description: newDescription || findArticle.description,
      },
    });
    return NextResponse.json({ message: "Article Deleted with success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest, { params }: Iparams) {
  const { id } = params;
  try {
    const findArticle = await prisma.article.findUnique({
      where: { id: parseInt(id) },
      include: {
        comments: {
          include: {
            user: {
              select: {
                email: true,
                username: true,
                isAdmin: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    if (!findArticle) return NextResponse.json({ message: "article not found" }, { status: 404 });
    return NextResponse.json(findArticle, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}


export async function DELETE(request: NextRequest, { params }: Iparams) {
  const { id } = params;
  try {
    const user = VerifyToken(request);
    if (user === null) return NextResponse.json({ message: "You are not authenticated , access denied" }, { status: 401 });
    if (user.isAdmin === false) return NextResponse.json({ message: "only Admin can Delete Article , access denied" }, { status: 403 });
    const findArticle = await prisma.article.findUnique({ where: { id: parseInt(id) }  , include : {comments : true}});
    if (!findArticle) return NextResponse.json({ message: "Article not found" });
    //* delete Article
    const deleteArticle = await prisma.article.delete({ where: { id: parseInt(id) } });
    //* delete All the Comment that belong to this article
    const commentsIds : number[] = findArticle?.comments.map((c) => c.id)
    const deletComments = await prisma.comment.deleteMany({where : {id : {in : commentsIds } }})  //* in array of number

    return NextResponse.json({ message: "Article Deleted with success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error"}, { status: 500 });
  }
}