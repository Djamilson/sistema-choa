import { NEXT_PUBLIC_NODE_ENV, uri } from '@/_constants/environment-variables'
import { doLogout } from '@/auth/actions'
import axios, { AxiosInstance } from 'axios'
import { setCookie } from 'cookies-next'
import { AppError } from './errors/AppError'
import { getTokenByCookies } from './server-client'

type TPropsSetCookies = {
  token: string
  refreshToken: string
}

export async function setMeCookies({ token, refreshToken }: TPropsSetCookies) {
  setCookie('_next_auth.choa.token', token, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
    sameSite: true,
    secure: true,
    httpOnly: false,
  })

  setCookie('_next_auth.choa.refresh_token', refreshToken, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
    sameSite: true,
    secure: true,
    httpOnly: false,
  })
}

type PromiseType = {
  resolve: (value?: unknown) => void
  reject: (reason?: unknown) => void
}

type TdoLogout = () => void

type TProcessQueueParams = {
  error: Error | null
  token: string | null
}

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (doLogout: TdoLogout) => () => void
}

let isRefreshing = false
let failedRequestsQueue: Array<PromiseType> = []

const processQueue = ({ error, token = null }: TProcessQueueParams): void => {
  failedRequestsQueue.forEach((req) => {
    if (error) {
      req.reject(error)
    } else {
      req.resolve(token)
    }
  })

  failedRequestsQueue = []
}

export function setupAPIClient() {
  const api = axios.create({
    baseURL: uri[NEXT_PUBLIC_NODE_ENV],
  }) as APIInstanceProps

  api.interceptors.request.use(
    async (request: any) => {
      const { token } = await getTokenByCookies()
      if (token) {
        request.headers = {
          ...request.headers,
          Authorization: `Bearer ` + token,
        }
      }
      console.log('request', request)
      return request
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      if (requestError?.response?.status === 401) {
        if (
          requestError.response?.statusText === 'Unauthorized' ||
          requestError.response.data?.message?.name === 'TokenExpiredError'
        ) {
          const { token, refresh_token: refreshToken } =
            await getTokenByCookies()

          if (!token) {
            doLogout()
            return Promise.reject(requestError)
          }

          const originalConfig = requestError.config

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedRequestsQueue.push({ resolve, reject })
            })
              .then((token) => {
                originalConfig.headers.authorization = 'Bearer ' + token

                return api(originalConfig)
              })
              .catch((error) => {
                throw error
              })
          }

          isRefreshing = true

          return new Promise(async (resolve, reject) => {
            try {
              const url = `refresh/collaborators/update`

              const { data } = await api.get(url, {
                params: {
                  refreshToken,
                },
              })

              await setMeCookies({
                token: data.token,
                refreshToken: data.refreshToken,
              })

              api.defaults.headers.common.authorization = 'Bearer ' + data.token
              originalConfig.headers.authorization = 'Bearer ' + data.token

              processQueue({ error: null, token: data.token })
              resolve(api(originalConfig))
            } catch (error: any) {
              processQueue({ error, token: null })
              doLogout()
              reject(error)
            } finally {
              isRefreshing = false
            }
          })
        }

        doLogout()
      }

      if (requestError.response && requestError.response.data) {
        const { message, statusCode } = requestError.response.data

        return Promise.reject(new AppError(message, statusCode))
      } else {
        return Promise.reject(requestError)
      }
    },
  )

  return api
}
