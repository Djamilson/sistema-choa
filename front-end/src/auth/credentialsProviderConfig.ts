import { api } from '@/_services/apiClient'
import * as masks from '@/components/inputs/masks'
import CredentialsProvider from 'next-auth/providers/credentials'
import { cookies } from 'next/headers'

export const credentialsProviderConfig = CredentialsProvider({
  name: 'credentials',
  credentials: {
    email: {},
    password: {},
  },
  async authorize(credentials) {
    try {
      if (!credentials.email || !credentials.password) return null

      const res = await api.post('sessions/collaborators', {
        email: credentials.email,
        password: credentials.password,
      })

      const { user, token, refreshToken } = res.data

      if (!user) {
        throw new Error('User not found.')
      }

      cookies().set('_next_auth.choa.token', token, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
        sameSite: true,
        secure: true,
        httpOnly: false,
      })
      cookies().set('_next_auth.choa.refresh_token', refreshToken, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
        sameSite: true,
        secure: true,
        httpOnly: false,
      })

      api.defaults.headers.common.authorization = `Bearer ${token}`

      return {
        ...user,
        person: {
          ...user.person,
          cpfOrCnpjFormat:
            user.person.cpf && masks.cpfOrCnpjMask.maskDefault(user.person.cpf),
          birth_dateFormat:
            user.person.birth_date &&
            masks.dateMask.maskDefault(user.person.birth_date),
        },

        name: user.person.name,
        email: user.person.email,
        picture: null,

        refresh_token: token,
        access_token: refreshToken,
      }
    } catch (error: any) {
      throw new Error(error)
    }
  },
})
