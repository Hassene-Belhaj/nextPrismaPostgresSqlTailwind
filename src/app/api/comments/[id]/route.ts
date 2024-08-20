import { NextRequest , NextResponse } from "next/server";
import { VerifyToken } from "@/utils/verifyToken";
import { Ieditcomment, Iparams } from "@/utils/types/Types";
import prisma from "@/utils/prismaDb";


/*
 @method  PUT
 @route   ~/api/comment/id
 @desc    update comment
 @access  private
 */


export async function PUT (request : NextRequest , {params} : Iparams) {
    const {id} = params ;
    const  {newText} = await request.json() as Ieditcomment ;
    try {
        const findComment = await prisma.comment.findUnique({where : {id : parseInt(id)}}) ;
        if(!findComment) return NextResponse.json({message : 'can not find comment '} , {status : 404})
        const user = VerifyToken(request) ;
        if(user === null || !user) return NextResponse.json({message : "you are nt authenticated , access denied"} , {status : 401})
        if(user.id !== findComment.userId) return NextResponse.json({message : "this comment is not posted by you , you can not edit it , access denied "} , {status : 403})     
        const editeComment = await prisma.comment.update({where : {id : parseInt(id)} , data : { text : newText  , articleId : findComment.articleId }})    
        return NextResponse.json({message : "comment updated with success" , editeComment} , {status : 200})  
        
    } catch (error) {
        return NextResponse.json({mesage : "Internal Server Error"} , {status : 500})
    }
        
}

/*
 @method  DELETE
 @route   ~/api/comment/id
 @desc    delete comment
 @access  private
 */

export async function DELETE (request : NextRequest , {params} : Iparams) {
    const {id} = params ;
    try {
        const findComment = await prisma.comment.findUnique({where : {id : parseInt(id)}})
        if(!findComment) return NextResponse.json({message : "can not find this comment" } , {status : 404}) 
        const user = VerifyToken(request)
        if(user === null ) return NextResponse.json({message : "you are not authenticated , access denied"} , {status : 400})
        if(user.isAdmin || user.id === findComment.userId) {
            const deletecomment = await prisma.comment.delete({where : {id : parseInt(id)}})
            return NextResponse.json({message : 'comment deleted with success'} , {status : 200})
        } 

        return NextResponse.json({message : "this comment is not posted by you , you can not edit it , access denied "} , {status : 403})     
           
    } catch (error) {
       return NextResponse.json({message : "Internal Server Error"} , {status : 500}) 
    }
   
}   