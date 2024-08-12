import { IPerson } from '@/@model/person/person'
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  export interface User {
    id: string
    name: string
    email: string
    username: string
    avatar_url: string | null | undefined
    person: IPerson
    roles: string[]

    refresh_token?: string
    access_token?: string
  }

  interface Session {
    user: User & DefaultSession['user']

    refresh_token?: string
    access_token?: string
    error?: 'RefreshAccessTokenError'
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    expires_at?: string
    refresh_token?: string
    access_token?: string
    error?: 'RefreshAccessTokenError'
  }
}
