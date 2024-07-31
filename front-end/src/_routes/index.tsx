'use client'

import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import { APP_ROUTES } from './app-routes/app-routes'
import { useCheckUserAuthenticationAndValidateUserPermissions } from './useCheckUserAuthenticationAndValidateUserPermissions'
import { useGetValidateUserPermissions } from './useGetValidateUserPemissions'

type PrivateRouteProps = {
  children: ReactNode
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { push } = useRouter()

  const isUserAuthenticated =
    useCheckUserAuthenticationAndValidateUserPermissions()

  const isValidateUserPermissions = useGetValidateUserPermissions()

 /* useEffect(() => {
    if (!isUserAuthenticated) {
      push(APP_ROUTES.public.signin)
    }
  }, [isUserAuthenticated, push])*/

  useEffect(() => {
    if (!isValidateUserPermissions) {
      push(APP_ROUTES.private.unauthorized.name)
    }
  }, [isValidateUserPermissions, push])

  return (
    <>
      {/*!isUserAuthenticated && null*/}
      {/*isUserAuthenticated && children*/}
      {children}
    </>
  )
}

export default PrivateRoute
