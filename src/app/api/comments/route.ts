import { Verifytoken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";
import prisma from '@/utils/prismaDb'


interface IcreateComment {
    text : string ,
    articleId : number
}

export async function POST (request : NextRequest) {
    const {text , articleId} = await request.json() as IcreateComment;
    try {
        const user = Verifytoken(request)
        if(!user) return NextResponse.json({message : "only logged in user can post comment"} , {status : 401})
        if(!text || !articleId) return NextResponse.json({message : 'please fill requested fill'} , {status : 400})   
        const createComment = await prisma.comment.create({
          data : {
            text , 
            articleId , 
            userId : user.id
          }
        })
        return NextResponse.json({message : "comment created with success", data : createComment} , {status : 201})
    } catch (error) {
        return NextResponse.json({message : "Internal Server error"} , {status : 500})
    }
}