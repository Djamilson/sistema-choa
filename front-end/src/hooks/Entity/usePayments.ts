import { IAddress } from '@/@model/address/address'
import { api } from '@/_services/apiClient'
import { IReceiverDBProps } from '@/app/(authenticated)/payments/components/MainPayment/usePayments'
import { formatZipCodeInPoint } from '@/utils/formatZipCode'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export async function getReceiverByUseId(
  userId: string,
): Promise<IReceiverDBProps> {
  const url = `receivers/${userId}`

  const { data } = await api.get(url)

  return data
}

export function useReceiverByUserId(userId: string) {
  return useQuery<IReceiverDBProps, unknown>({
    queryKey: ['hydrate-receiver-id', userId],
    queryFn: () => getReceiverByUseId(userId),
  }) as UseQueryResult<IReceiverDBProps, unknown>
}

export async function getAllReceiverByUseId(
  userId: string,
): Promise<IReceiverDBProps[]> {
  const url = `receivers/all/receivers/${userId}`

  const { data } = await api.get(url)

  return data
}

export function useAllReceiverByUserId(userId: string) {
  return useQuery<IReceiverDBProps[], unknown>({
    queryKey: ['hydrate-all-receivers', userId],
    queryFn: () => getAllReceiverByUseId(userId),
  }) as UseQueryResult<IReceiverDBProps[], unknown>
}

export async function getAllAddressesReceiverByReceiverId(
  receiverId: string,
): Promise<IAddress[]> {
  const url = `receivers/all/addresses/${receiverId}`

  const { data } = await api.get(url)

  const addresses = data?.addresses?.map((address: IAddress) => {
    return {
      ...address,
      zipCodeFormat: formatZipCodeInPoint(address.zip_code),
      main: data?.address_id === address.id,
    }
  })

  return addresses
}

export function useAllAddressReceiverByReceiverId(receiverId: string) {
  return useQuery<IAddress[], unknown>({
    queryKey: ['hydrate-all-addresses-receivers', receiverId],
    queryFn: () => getAllAddressesReceiverByReceiverId(receiverId),
  }) as UseQueryResult<IAddress[], unknown>
}
