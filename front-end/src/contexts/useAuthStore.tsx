'use client'

import { IPerson } from '@/@model/person/person'
import { IUser } from '@/@model/user/user'
import { api } from '@/_services/apiClient'
import { AppError } from '@/_services/errors/AppError'
import * as masks from '@/components/inputs/masks'
import { getUser } from '@/hooks/Entity/useUsers'
import { medida } from '@/utils/media'
import { destroyCookie, setCookie } from 'nookies'
import { create } from 'zustand'
import { logado } from './logado'

type TPropsSetCookies = {
  token: string
  refreshToken: string
}

export async function setMeCookies({ token, refreshToken }: TPropsSetCookies) {
  setCookie(undefined, '_next_auth.choa.token', token, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
    sameSite: true,
    secure: true,
  })

  setCookie(
    undefined,
    '_next_auth.choa.refresh_token',
    refreshToken,
    {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
      sameSite: true,
      secure: true,
    },
  )
}

type SignInCredentials = {
  email: string
  password: string
}

type IActionsProps = {
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
  updateUser: (userId: string) => Promise<void>
  getUpdateUserByRefreshToken: (refreshToken: string) => Promise<void>
  updateAvatarUser: (person: IPerson) => void
}

type IStoreProps = {
  state: {
    user: IUser
    isAuthenticated: boolean
  }
  actions: IActionsProps
}

export const useAuthStore = create<IStoreProps>((set) => ({
  state: {
    user: {} as IUser,
    isAuthenticated: false,
  },
  actions: {
    signIn: async ({ email, password }: SignInCredentials) => {
      try {
        const device = medida()

        const res = await api.post('sessions/colaborators', {
          email,
          password,
          device,
          software: process.env.NEXT_PUBLIC_ENV_SOFTWARE,
        })

        const { user, token, refreshToken } = res.data
        await setMeCookies({ token, refreshToken })
        api.defaults.headers.common.authorization = `Bearer ${token}`

        set({
          state: {
            user: {
              ...user,
              person: {
                ...user.person,
                cpfOrCnpjFormat:
                  user.person.cpf &&
                  masks.cpfOrCnpjMask.maskDefault(user.person.cpf),
                birth_dateFormat:
                  user.person.birth_date &&
                  masks.dateMask.maskDefault(user.person.birth_date),
              },
            },
            isAuthenticated: !!user.id,
          },
        })
      } catch (error: any) {
        throw new AppError(error.message, error.statusCode)
      }
    },
    updateUser: async (userId: string) => {
      try {
        const { firstName, is_verified, person } = await getUser(userId)

        set((prevState) => {
          const {
            state: { user, isAuthenticated },
          } = { ...prevState }

          return {
            state: {
              user: {
                ...user,
                firstName,
                is_verified,
                person: {
                  ...person,
                  cpfOrCnpjFormat:
                    person.cpf && masks.cpfOrCnpjMask.maskDefault(person.cpf),
                  birth_dateFormat:
                    person.birth_date &&
                    masks.dateMask.maskDefault(person.birth_date),
                },
              },
              isAuthenticated,
            },
          }
        })
      } catch (error: any) {
        throw new AppError(error.message, error.statusCode)
      }
    },
    updateAvatarUser: async (person: IPerson) => {
      try {
        set((prevState) => {
          const {
            state: { user, isAuthenticated },
          } = { ...prevState }

          return {
            state: {
              user: {
                ...user,
                person: {
                  ...person,
                  cpfOrCnpjFormat:
                    person.cpf && masks.cpfOrCnpjMask.maskDefault(person.cpf),
                  birth_dateFormat:
                    person.birth_date &&
                    masks.dateMask.maskDefault(person.birth_date),
                },
              },
              isAuthenticated,
            },
          }
        })
      } catch (error: any) {
        throw new AppError(error.message, error.statusCode)
      }
    },
    signOut: () => {
      destroyCookie(null, logado.nameToken)
      destroyCookie(null, logado.nameRefreshToken)

      set({
        state: {
          user: {} as IUser,
          isAuthenticated: false,
        },
      })
    },
    getUpdateUserByRefreshToken: async (refreshToken: string) => {
      try {
        const device = medida()

        const url = `refresh/colaborators/update`

        const { data } = await api.get(url, {
          params: {
            refreshToken,
            device,
            software: process.env.NEXT_PUBLIC_ENV_SOFTWARE,
          },
        })

        const { user, token, refreshToken: newRefreshToken } = data

        await setMeCookies({ token, refreshToken: newRefreshToken })

        api.defaults.headers.common.authorization = `Bearer ${token}`

        set({
          state: {
            user: {
              ...user,
              person: {
                ...user.person,
                cpfOrCnpjFormat:
                  user.person.cpf &&
                  masks.cpfOrCnpjMask.maskDefault(user.person.cpf),
                birth_dateFormat:
                  user.person.birth_date &&
                  masks.dateMask.maskDefault(user.person.birth_date),
              },
            },
            isAuthenticated: !!user.id,
          },
        })
      } catch {
        destroyCookie(null, logado.nameToken)
        destroyCookie(null, logado.nameRefreshToken)

        set({
          state: {
            user: {} as IUser,
            isAuthenticated: false,
          },
        })
      }
    },
  },
}))
