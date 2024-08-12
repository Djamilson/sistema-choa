import { api } from '@/_services/apiClient'
import { AppError } from '@/_services/errors/AppError'
import * as masks from '@/components/inputs/masks'
import type { Adapter, AdapterUser } from 'next-auth/adapters'
import { NextRequest } from 'next/server'
import { parseCookies } from 'nookies'

export function PrismaAdapter(req: NextRequest | undefined): Adapter {
  return {
    async createUser(user) {
      try {
        const { '@ignitecall:userId': userIdOnCookies } = parseCookies({ req })

        if (!userIdOnCookies) {
          throw new Error('User ID not found on cookies.')
        }

        const newUser = {} as AdapterUser

        return newUser
      } catch (error: any) {
        throw new Error(error)
      }
    },
    async getUser(userId) {
      try {
        const url = `registers/collaborators/ids/${userId}`

        const { data } = await api.get(url)

        if (!data) {
          return null
        }

        return {
          ...data,
          person: {
            ...data.person,
            cpfOrCnpjFormat:
              data.person?.cpf &&
              masks.cpfOrCnpjMask.maskDefault(data.person.cpf),
            birth_dateFormat:
              data.person.birth_date &&
              masks.dateMask.maskDefault(data.person.birth_date),
          },
        }
      } catch (error: any) {
        throw new Error(error)
      }
    },
    async getUserByEmail(email) {
      try {
        const url = `registers/collaborators/emails/${email}`

        const { data } = await api.get(url)

        if (!data) {
          return null
        }

        return {
          ...data,
          person: {
            ...data.person,
            cpfOrCnpjFormat:
              data.person?.cpf &&
              masks.cpfOrCnpjMask.maskDefault(data.person.cpf),
            birth_dateFormat:
              data.person.birth_date &&
              masks.dateMask.maskDefault(data.person.birth_date),
          },
        }
      } catch (error: any) {
        throw new Error(error)
      }
    },
    async getUserByAccount({ providerAccountId, provider }) {
      try {
        const url = `oauth/accounts/${providerAccountId}/${provider}`

        const { data } = await api.get(url)

        if (!data) {
          return null
        }

        return {
          ...data,
          person: {
            ...data?.person,
            cpfOrCnpjFormat:
              data?.person?.cpf &&
              masks.cpfOrCnpjMask.maskDefault(data?.person?.cpf),
            birth_dateFormat:
              data?.person?.birth_date &&
              masks.dateMask.maskDefault(data?.person?.birth_date),
          },
        }
      } catch (error: any) {
        console.log('Erro da porra: ', error)
        throw new Error(error)
      }
    },
    async updateUser(user) {
      try {
        const url = `registers/collaborators/users/update/${user.id}`

        const { data } = await api.put(url, {
          name: user.name,
          email: user.id!,
          avatar_url: user.access_token,
        })

        return {
          id: data.id,
          name: data.name,
          username: data.name,
          email: data.person.email,
          emailVerified: null,
          avatar_url: data.avatar,
          person: {
            ...data.person,
            cpfOrCnpjFormat:
              data.person?.cpf &&
              masks.cpfOrCnpjMask.maskDefault(data.person.cpf),
            birth_dateFormat:
              data.person.birth_date &&
              masks.dateMask.maskDefault(data.person.birth_date),
          },
          roles: data.roles,
        }
      } catch (error: any) {
        throw new Error(error)
      }
    },
    async linkAccount(account) {
      try {
        const url = `oauth/accounts/news`

        await api.post(url, {
          user_id: account.userId,
          type: account.type,
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state,
        })
      } catch (error) {}
    },
    async createSession({ sessionToken, userId, expires }) {
      try {
        const url = `oauth/sessions/news`

        await api.post(url, { sessionToken, userId, expires })

        return {
          userId,
          sessionToken,
          expires: new Date(expires),
        }
      } catch (error) {
        throw new AppError(error)
      }
    },
    async getSessionAndUser(sessionToken) {
      try {
        const url = `oauth/sessions/${sessionToken}`

        const { data } = await api.get(url)

        if (!data) {
          return null
        }

        const { user, ...session } = data

        return {
          session: {
            userId: session.user_id,
            expires: session.expires,
            sessionToken: session.session_token,
          },
          user: {
            ...user,
            person: {
              ...user.person,
              cpfOrCnpjFormat:
                user.person?.cpf &&
                masks.cpfOrCnpjMask.maskDefault(user.person.cpf),
              birth_dateFormat:
                user.person.birth_date &&
                masks.dateMask.maskDefault(user.person.birth_date),
            },
            name: 'essa merdaGetSession',
            email: 'getsssion@gmail.com',
            picture: null,
          },
        }
      } catch (error) {
        return null
      }
    },
    async updateSession({ sessionToken, userId, expires }) {
      try {
        const url = `oauth/sessions/${sessionToken}`

        const { data } = await api.patch(url, {
          userId,
          expires,
        })

        if (!data) {
          return null
        }

        return {
          sessionToken: data.session_token,
          userId: data.user_id,
          expires: data.expires,
        }
      } catch (error: any) {
        throw new Error(error)
      }
    },
    async deleteSession(sessionToken) {
      try {
        const url = `oauth/sessions/${sessionToken}`

        await api.delete(url)
      } catch (error: any) {
        throw new Error(error)
      }
    },
    async useVerificationToken({ token }) {
      try {
        const url = `oauth/sessions/${token}`

        const { data } = await api.get(url)

        if (!data) {
          return null
        }

        return data
      } catch (error) {
        throw new AppError(error)
      }
    },
    async createVerificationToken({ identifier, expires, token }) {
      try {
        // const url = `oauth/sessions/${token}`

        // const { data } = await api.get(url)

        /* if (!data) {
          return null
        } */

        return null
      } catch (error) {
        throw new AppError(error)
      }
    },
  }
}
