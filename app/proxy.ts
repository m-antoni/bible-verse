// proxy.ts (in your root directory)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  // 1. Get the response object
  const response = NextResponse.next();

  // 2. Check for the session cookie
  const sessionToken = request.cookies.get('session-token');

  // 3. Logic: If the token exists but is invalid/expired
  // (Replace 'isExpired' with your actual logic or library check)
  if (sessionToken && checkIfExpired(sessionToken.value)) {
    // This is the ONLY place Next.js 16 allows cookie deletion
    // during a page navigation.
    response.cookies.delete('session-token');

    // Optional: Redirect to login page if they are unauthorized
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }

  return response;
}

// Ensure the proxy doesn't run on images or static files
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

// Dummy helper - replace with your actual session logic
function checkIfExpired(token: string) {
  // Your logic here (e.g., JWT decode or database check)
  return false;
}
