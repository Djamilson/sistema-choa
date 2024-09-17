import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'

const staleTime = 5 * 10 * 100
// staleTime: 100 * 60 * 10, // 10 min
const queryClientCache = new QueryCache({})

const getQueryClient = () =>
  new QueryClient({
    defaultOptions: { queries: { staleTime } },
    queryCache: queryClientCache,
    mutationCache: new MutationCache(),
  })

export { getQueryClient }
