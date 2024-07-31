import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import { PrismaAdapter } from './prisma-adapter'

export const { handlers, auth, signIn, signOut } = NextAuth((req) => {
  return {
    adapter: PrismaAdapter(req),
    ...authConfig,
  }
})
