import {NextRequest , NextResponse} from 'next/server'


export function middleware (request : NextRequest) {
    console.log('"middleware is called')
    const access_token = request.cookies.get('access_token')
    const token = access_token?.value as string
    if(!token) {
        if(request.nextUrl.pathname.startsWith("/api/users/profile")) {
            return NextResponse.json({message : 'user is not authenticated , message from middleware'} , {status : 401});
        }
    } else {
        if(request.nextUrl.pathname.includes("/sign")) {
            return NextResponse.redirect(new URL("/" , request.url))
        }
    }


}

export const config = {
    matcher : ["/api/users/profile/:path*" , "/signin" , "/signup"]
}