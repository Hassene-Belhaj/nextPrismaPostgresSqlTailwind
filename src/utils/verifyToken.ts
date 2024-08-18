import jwt, { JwtPayload } from 'jsonwebtoken' ;
import { NextRequest, NextResponse } from 'next/server';





export  function Verifytoken (request : NextRequest) : JwtPayload |null {
    try {
        const access_token = request.cookies.get("access_token")
        const token = access_token?.value
        if(!token) {
            return null ;
        }
        const userPayload = jwt.verify(token , process.env.SECRETJWT as string) as JwtPayload ;

        if(!userPayload) return NextResponse.json({message : 'invalid token'} , {status : 403})
        
        return userPayload ; 
        
    } catch (error) {

        return null ;   
    }


} 
