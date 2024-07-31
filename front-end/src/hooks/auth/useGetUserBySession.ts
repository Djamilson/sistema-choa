'use client'

import { DefaultSession, User } from 'next-auth'
import { useSession } from 'next-auth/react'

const useGetUserBySession = (): (User & DefaultSession['user']) | undefined => {
  const { data: session } = useSession()

  // if (!session || !session.user) return redirect(`/signin`)

  if (!session || !session.user) return

  return session.user
}

export default useGetUserBySession
