import {NextRequest , NextResponse} from 'next/server'
import jwt from 'jsonwebtoken'

export function middleware (request : NextRequest) {
    console.log('"middleware is called')
    const access_token = request.cookies.get('access_token')
    const token = access_token?.value as string
    // if(!token && request.method === 'DELETE') return NextResponse.json({message : 'user is not authenticated , message from middleware'} , {status : 401});
    if(!token) return NextResponse.json({message : 'user is not authenticated , message from middleware'} , {status : 401});

}

export const config = {
    matcher : ['/api/users/profile/:path*']
}