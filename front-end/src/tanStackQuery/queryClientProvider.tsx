'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PropsWithChildren } from 'react'
import { getQueryClient } from './getQueryClient'
const queryClient = getQueryClient()

function QueryClientProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {<ReactQueryDevtools initialIsOpen={true} />}
    </QueryClientProvider>
  )
}

export { QueryClientProviders }
