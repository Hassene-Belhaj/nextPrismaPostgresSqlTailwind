import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prismaDb";
import { Verifytoken } from "@/utils/verifyToken";
import { IupdateUser } from "@/utils/types/Types";
import bcrypt from 'bcryptjs'

/* 
@method  DELETE
@route ~/api/users/profile/id
desc   delete
access  private //*
*/

interface Iprops {
  params: {
    id: string;
  };
}

export async function DELETE(request: NextRequest, { params }: Iprops) {
  const {id} = params ;
  try {
    const findUser = await prisma.user.findUnique({ where: { id: parseInt(params.id) } });

    if (!findUser) return NextResponse.json({ message: "can not find this user" }, { status: 400 });

    const verifyAccessToken = Verifytoken(request);

    if (verifyAccessToken !== null && verifyAccessToken.id === findUser.id) {
      await prisma.user.delete({ where: { id: parseInt(id) } });
      return NextResponse.json({ message: "your account has been deleted with success" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Sorry , you can delete Only your account" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

/* 
@method  GET
@route ~/api/users/profile/id
desc   Get profile
access  private //*
*/

export async function GET(request: NextRequest, { params }: Iprops) {
  const { id } = params;
  try {
    const findUser = await prisma.user.findUnique({ 
      where: { id: parseInt(id) },
      select : {
        id : true ,
        email : true ,
        username : true , 
        createdAt : true ,
      }
    });
    if (!findUser) return NextResponse.json({ message: "can not find user" }, { status: 404 });

    const verifyAccessToken = Verifytoken(request);

    if (verifyAccessToken === null || verifyAccessToken.id !== parseInt(id)) {
      return NextResponse.json({ message: "you are not allowed , access denied" }, { status: 403 });
    }

    return NextResponse.json({ data: findUser }, { status: 200 });
    // authorization
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}


/* 
@method  PUT
@route ~/api/users/profile/id
desc   update Profile
access  private //*
*/



export async function PUT (request : NextRequest , {params} : Iprops) {
   const {id} = params ;
   let {newUsername , newEmail , newPassword} = await request.json() as IupdateUser ;
  try {
    const findUser = await prisma.user.findUnique({where : {id : parseInt(id)}})
    if(!findUser) return NextResponse.json({message : "can not find user"} , {status : 404})
   
    const verifyAccessToken = Verifytoken(request)  

    if(verifyAccessToken === null || verifyAccessToken.id !== parseInt(id)) {
      return NextResponse.json({message : 'you are not allowed to update this account data'} , {status : 403})
    }

    if(newPassword) {
      const Salt =  bcrypt.genSaltSync(10) ;
      newPassword = bcrypt.hashSync(newPassword , Salt)
    }

    const updateUser = await prisma.user.update(
      {where : {id : parseInt(id)} , 
      data : {username : newUsername || findUser.username , email : newEmail || findUser.email , password :  newPassword || findUser.password} , 
      select : {username : true , email : true , isAdmin : true , updatedAt : true}})
    
    return NextResponse.json({message : "user updated with success" , data : updateUser} , {status : 200})
  
  } catch (error) {
     return NextResponse.json({message : "Internal Server Error"} , {status : 500})
  }
}