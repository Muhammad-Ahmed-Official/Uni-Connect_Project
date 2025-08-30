import withAuth from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
    function middleware() {
        return NextResponse.next()
    },
    {
        callbacks: {
            async authorized({ req, token }) {
                const { pathname } = req.nextUrl;

                if (pathname.startsWith('/admin')) {
                    if (token?.role === 'admin') {
                        return true;
                    } else {
                        return false;
                    }
                }

                return !!token;
            },
        }
    }
)

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/departments/:path*",
        "/events/:path*",
        "/docs/:path*",
        "/settings/:path*",
        "/admin/:path*",
    ],
}