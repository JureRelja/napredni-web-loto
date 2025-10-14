import { NextResponse, NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  //check auth
  const token = request.cookies.get('token')?.value
  if (token) {
    return NextResponse.next()
  }
  return NextResponse.redirect(new URL('/public/login', request.url))
}
 
export const config = {
  matcher: '/*',
}
