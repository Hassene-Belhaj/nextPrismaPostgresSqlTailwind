import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prismaDb";
import { VerifyToken } from "@/utils/verifyToken";
import { Icomment } from "@/utils/types/Types";


/*
 @method  POST
 @route   ~/api/comment
 @desc    post new comment
 @access  public
 */


export async function POST(request: NextRequest) {
  const { text, articleId } = (await request.json()) as Icomment;
  try {
    if (!text || !articleId) return NextResponse.json({ message: "please fill requested fill" }, { status: 400 });

    const user = VerifyToken(request);
    if (user === null || !user) return NextResponse.json({ message: "you are not authenticated , access denied" }, { status: 403 });

    const createComment = await prisma.comment.create({
      data: {
        text,
        articleId,
        userId: user.id,
      },
    });
    return NextResponse.json({ message: "comment created with success", data: createComment }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server error" }, { status: 500 });
  }
}


/*
 @method  GET
 @route   ~/api/comment
 @desc    get comments
 @access  public
 */

export async function GET(request: NextRequest) {
  try {
    const user = VerifyToken(request);
    if(user === null || user.isAdmin === false) {
      return  NextResponse.json({message : "only admin is allowed , access denied"}, {status : 403}) 
    } 
    const allComments = await prisma.comment.findMany() ;
    return NextResponse.json(allComments , {status : 200})    
  } catch (error) {
    return NextResponse.json({message : 'Internal server Error'} , {status : 500})
  }
}
