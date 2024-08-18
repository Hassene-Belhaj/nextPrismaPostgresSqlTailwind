import prisma from "@/utils/prismaDb";
import {NextRequest , NextResponse} from 'next/server'



interface Iarticle {
    title : string ,
    description : string ,
}


export async function POST(request  : NextRequest) {
   const {title , description } = await request.json() as Iarticle ;
   try {
    if(!title || !description) return NextResponse.json({ message : 'please fill all requested fields' } , {status : 400})
    const createArticle = await prisma.article.create({
        data : {
            title , description
        }
    })
    return NextResponse.json({message : "Article created with success" , data : createArticle} , {status : 201})
   } catch (error) {
      return NextResponse.json({message : "Internal Server Error"} , {status : 500})
   }
}