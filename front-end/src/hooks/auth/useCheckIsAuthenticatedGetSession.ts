'use client'

import { useSession } from 'next-auth/react'

const useCheckIsAuthenticatedGetSession = () => {
  const { data: session, status } = useSession()

  if (status === 'authenticated' && session && session.user) return true

  return false
}

export default useCheckIsAuthenticatedGetSession
