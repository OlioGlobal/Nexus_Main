import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ADMIN_SECRET = 'x7k-nexus-panel'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect /admin routes
  if (pathname.startsWith('/admin')) {
    // Allow if already authenticated (has payload-token cookie)
    const token = request.cookies.get('payload-token')
    if (token) return NextResponse.next()

    // Allow if secret key is in URL: /admin?key=x7k-nexus-panel
    const key = request.nextUrl.searchParams.get('key')
    if (key === ADMIN_SECRET) {
      // Set a session cookie so they don't need the key again
      const response = NextResponse.next()
      response.cookies.set('admin-access', 'granted', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
      })
      return response
    }

    // Allow if admin-access cookie exists
    const adminAccess = request.cookies.get('admin-access')
    if (adminAccess?.value === 'granted') return NextResponse.next()

    // Block — return 404 so it looks like the page doesn't exist
    return new NextResponse('Not Found', { status: 404 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
