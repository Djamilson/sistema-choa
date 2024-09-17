'use client'

import { usePathname } from 'next/navigation'
import { checkIsPublicRoute } from './check-is-public-route'

const useIsPublicPage = () => {
  const pathname = usePathname()

  const isPublicPage = checkIsPublicRoute(pathname!)

  return {
    isPublicPage,
  }
}

export { useIsPublicPage }
