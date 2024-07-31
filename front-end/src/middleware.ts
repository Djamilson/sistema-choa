import NextAuth from 'next-auth'
import { NextResponse } from 'next/server'
import { authConfig } from './auth/auth.config'
import {
  DEFAULT_LOGIN_REDIRECT,
  authRoutes,
  protectedRoutes,
  publicRoutes,
} from './auth/routes'
const { auth } = NextAuth(authConfig)

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|__nextjs_original-stack-frame|favicon.ico|vercel.svg|logo192.png|logo512.png|manifest.json|next.svg|robots.txt).*)',
  ],
}

export default auth((req) => {
  const { nextUrl } = req
  const isAuthenticated = !!req.auth
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const pathname = nextUrl.pathname

  const isProtectedRoute = protectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route),
  )

  if (
    publicRoutes.includes(pathname) ||
    pathname.startsWith('/product-detail/')
  ) {
    return NextResponse.next()
  }

  if (isProtectedRoute && !isAuthenticated) {
    const requestedRoute = req.nextUrl.pathname

    return Response.redirect(
      new URL(`/signin?callbackUrl=${requestedRoute}`, nextUrl),
    )
  }

  if (isAuthRoute) {
    if (isAuthenticated) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
  }
})
