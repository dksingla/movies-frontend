// app/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token'); // Get the token from cookies
    const url = req.nextUrl.clone();

    // Define the protected routes
    const protectedRoutes = ['/movielist', '/empty'];

    // Check if the user is trying to access a protected route without a token
    if (!token && protectedRoutes.includes(url.pathname)) {
        url.pathname = '/'; // Redirect to the login page
        return NextResponse.redirect(url);
    }

    // Allow the request to proceed
    return NextResponse.next();
}

// Apply middleware only to specific paths
export const config = {
    matcher: ['/movielist', '/empty'], // Apply middleware to these routes
};