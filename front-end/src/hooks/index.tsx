'use client'

import { QueryClientProviders } from '@/tanStackQuery/queryClientProvider'
import { SessionProvider } from 'next-auth/react'

import { ReactNode } from 'react'

type IProps = {
  children: ReactNode
}

function AppProvider({ children }: IProps) {
  // const { isPublicPage } = useIsPublicPage()

  return (
    <QueryClientProviders>
      <SessionProvider>
        {/* isPublicPage && children}
        {!isPublicPage && <PrivateRoute>{children}</PrivateRoute> */}
        {children}
      </SessionProvider>
    </QueryClientProviders>
  )
}
export default AppProvider
