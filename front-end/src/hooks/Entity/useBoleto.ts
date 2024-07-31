import { IBolix } from '@/@model/Bolix/bolix'
import { api } from '@/_services/apiClient'
import { useQuery } from '@tanstack/react-query'

export async function getTransactionId(transactionId: string): Promise<IBolix> {
  const url = `transactions/bolixs/v1/charge/${transactionId}`

  const { data } = await api.get(url)

  console.log('DATATA Pix:', data)

  return data.payment
}

export function useBoletoByTransactionId(transactionId: string) {
  return useQuery<IBolix, unknown>({
    queryKey: ['hydrate-boleto', transactionId],
    queryFn: () => getTransactionId(transactionId),
  })
}
