'use client'

import { ReactNode, useEffect, useState } from 'react'
interface ClientOnlyProps {
  children: ReactNode
}

/* initMercadoPago(NEXT_PUBLIC_MERCADO_PAGO_DEV_PUBLIC, {
  locale: 'pt-BR',
}) */

const ClientOnly = ({ children }: ClientOnlyProps) => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  /* 

  useEffect(() => {
    const cookies = parseCookies()

    const { '_next_auth.choa.refresh_token': refreshToken } =
      cookies

    const handleRefreshToken = async (refreshToken: string) => {
      await getUpdateUserByRefreshToken(refreshToken)
    }

    if (!user?.id && refreshToken) {
      handleRefreshToken(refreshToken)
    }
  }, [isAuthenticated, user, getUpdateUserByRefreshToken])

  if (!hasMounted) return null */

  if (!hasMounted) return null

  return <>{children}</>
}

export default ClientOnly
