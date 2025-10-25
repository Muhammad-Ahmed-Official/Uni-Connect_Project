import withAuth from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
    function middleware(req) {
        const { pathname } = req.nextUrl;
        const token = req.nextauth.token;

        if (pathname.startsWith('/admin')) {
            if (token?.role === 'admin') {
                return NextResponse.next();
            }
            return NextResponse.redirect(new URL('/login', req.url));
        }

        if (pathname.startsWith('/dashboard') ||
            pathname.startsWith('/departments') ||
            pathname.startsWith('/events') ||
            pathname.startsWith('/docs') ||
            pathname.startsWith('/settings')) {

            if (!token) {
                return NextResponse.redirect(new URL('/login', req.url));
            }
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const { pathname } = req.nextUrl;

                if (pathname === '/login') {
                    return true;
                }

                if (pathname.startsWith('/admin')) {
                    return token?.role === 'admin';
                }

                const protectedRoutes = [
                    '/dashboard',
                    '/departments',
                    '/events',
                    '/docs',
                    '/settings'
                ];

                if (protectedRoutes.some(route => pathname.startsWith(route))) {
                    return !!token;
                }

                return true;
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
        "/login"
    ],
}