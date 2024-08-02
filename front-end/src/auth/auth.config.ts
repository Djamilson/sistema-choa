import { api } from '@/_services/apiClient'
import * as masks from '@/components/inputs/masks'
import { NextAuthConfig, User } from 'next-auth'
import { AdapterUser } from 'next-auth/adapters'
import { cookies } from 'next/headers'
import { credentialsProviderConfig } from './credentialsProviderConfig'
import { googleProviderConfig } from './googleProviderConfig'

type IUserRole = ['Administrador', 'Colaborador']

export const BASE_PATH = '/api/auth'

/* if (
  !process.env.NEXTAUTH_SECRET ||
  !process.env.NEXTAUTH_URL ||
  !process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID ||
  !process.env.NEXT_PUBLIC_AUTH_GOOGLE_SECRET
) {
  throw new Error('Auth required env variables are not set')
} */

export const authConfig = {
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/my-error',
  },
  events: {
    async linkAccount({ user }) {
      console.log('events linkAccount::', user)

      // fazer atualização no banco de dados dna tabela  user

      /**
       * awai db.use.upate({
       * where: {id:user.id }
       * data:{emailVerifield: new Date()}
       * })
       */
    },
    async signOut() {
      // add here
      // doLogout()
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  providers: [googleProviderConfig, credentialsProviderConfig],
  callbacks: {
    async signIn({ user, account }) {
      if (user?.id && account?.provider === 'google') {
        try {
          console.log('USER', JSON.stringify(user, null, 2))
          console.log('account', JSON.stringify(account, null, 2))
          const { email } = user?.person

          if (!email) return false

          const url = `oauth/providers/emails/${email}`
          const google = await api.post(url, {
            type: account.type,
            provider_account_id: account.providerAccountId,
          })

          const { access_token, refresh_token } = google.data.credentials

          cookies().set('_next_auth.choa.token', access_token, {
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
            sameSite: true,
            secure: true,
            httpOnly: false,
          })
          cookies().set('_next_auth.choa.refresh_token', refresh_token, {
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
            sameSite: true,
            secure: true,
            httpOnly: false,
          })

          api.defaults.headers.common.authorization = `Bearer ${access_token}`

          return true
        } catch (error: any) {
          if (error?.response?.data?.statusCode === 401) {
            return `/register/${encodeURIComponent(user.email!)}/${user?.name}`
          }
        }
      } else if (user?.id && account && account.provider === 'credentials') {
        try {
          console.log('Estou como credentials', user)
          const { id, refresh_token, access_token } = user
          const { providerAccountId, type, provider } = account

          const url = `/oauth/accounts/news`

          await api.post(url, {
            type,
            provider,
            provider_account_id: providerAccountId,
            user_id: id,
            refresh_token,
            access_token,
          })

          return true
        } catch (error: any) {
          throw new Error(error)
        }
      }
      return false
    },

    async redirect({ url, baseUrl }) {
      console.log('url, baseUrl', url, baseUrl)
      if (url.startsWith('/')) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url

      return `${baseUrl}/`
    },
    async jwt({ token, user, session, trigger, account }) {
      console.log('jwt callbacks:', { token, user, session, trigger, account })
      if (!token || !token?.sub) throw Error('JWT not found')

      // ***************************************************************
      // added code
      if (trigger === 'update' && session) {
        token = { ...token, user: session }
        return token
      }

      try {
        const userId = token?.sub
        const url = `registers/collaborators/ids/${userId}`

        const userExists = await api.get(url)

        if (!userExists?.data) {
          return token
        }

        token.roles = userExists.data.roles
        token.data = userExists.data
        // token.access_token = account.access_token
        // token.expires_at = account.expires_at
        // token.refresh_token = account.refresh_token

        return token
      } catch (error) {
        console.log('Error:', error)
        throw Error('Token sin Id')
      }
    },
    async session({ token, session }) {
      if (token.sub && session.user && !session.user?.person) {
        const userId = token?.sub
        const url = `registers/collaborators/ids/${userId}`

        const userExists = await api.get(url)

        session.user.id = userId
        session.user.person = userExists.data.person
      }

      if (token?.accessToken) {
        session.access_token = String(token.accessToken)
      }

      if (token.role && session.user) {
        session.user.roles = token.roles as IUserRole
      }

      if (token.data) {
        session.user = token.data as AdapterUser & User
      }

      return {
        ...session,
        user: {
          ...session.user,
          person: {
            ...session.user.person,
            cpfOrCnpjFormat:
              session.user.person?.cpf &&
              masks.cpfOrCnpjMask.maskDefault(session.user.person.cpf),
            birth_dateFormat:
              session.user.person.birth_date &&
              masks.dateMask.maskDefault(session.user.person.birth_date),
          },
          avatar_url: token.picture,
        },
      }
    },
  },
  theme: {
    logo: '/images/logo.png',
  },
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    pkceCodeVerifier: {
      name: 'next-auth.pkce.code_verifier',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true,
      },
    },
  },
  debug: process.env.NEXT_PUBLIC_ENV !== 'production',
} satisfies NextAuthConfig
