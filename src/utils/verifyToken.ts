import jwt, { JwtPayload } from 'jsonwebtoken' ;
import { NextRequest, NextResponse } from 'next/server';





export function VerifyToken (request : NextRequest) : JwtPayload | null {
    try {
        const access_token = request.cookies.get("access_token")
        const token = access_token?.value
        if(!token) {
            return null
        }

        const user = jwt.verify(token , process.env.SECRETJWT as string) as JwtPayload ;
        
        return user ; 
        
    } catch (error) {
        return null
    }


} 
