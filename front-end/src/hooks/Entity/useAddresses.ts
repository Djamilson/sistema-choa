import { IAddress } from '@/@model/address/address'
import { api } from '@/_services/apiClient'
import { formatZipCodeInPoint } from '@/utils/formatZipCode'

import { UseQueryResult, useQuery } from '@tanstack/react-query'

export async function getAddresses(): Promise<IAddress[]> {
  const url = `addresses`

  const { data } = await api.get(url)

  const orderList = data.map((address: IAddress) => {
    return {
      ...address,
      zipCodeFormat: formatZipCodeInPoint(address.zip_code),
    }
  })

  return orderList
}

export async function getAddressById(id: string): Promise<IAddress> {
  const url = `addresses/users/addresses/${id}`

  const { data } = await api.get(url)

  return { ...data, zipCodeFormat: formatZipCodeInPoint(data.zip_code) }
}

export function useAddresses() {
  return useQuery({
    queryKey: ['hydrate-addresses'],
    queryFn: () => getAddresses(),
  }) as UseQueryResult<IAddress[], unknown>
}

export function useAddressById(addressId: string) {
  return useQuery({
    queryKey: ['hydrate-address-id', { addressId }],
    queryFn: () => getAddressById(addressId),
  }) as UseQueryResult<IAddress, unknown>
}
