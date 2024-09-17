import { IPhone } from '@/@model/phone/phone'
import { api } from '@/_services/apiClient'
import * as masks from '@/components/inputs/masks'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

export async function getPhones(): Promise<IPhone[]> {
  const { data } = await api.get(`phones/users`)

  const listFormat = data.map((phone: IPhone) => {
    return {
      ...phone,
      phoneFormat: masks.phoneMask.maskDefault(phone.phone),
    }
  })

  return listFormat
}

export function usePhones() {
  return useQuery({
    queryKey: ['hydrate-phones'],
    queryFn: () => getPhones(),
  }) as UseQueryResult<IPhone[], unknown>
}

export async function getPhone(id: string): Promise<IPhone> {
  const url = `phones/${id}`

  const res = await api.get(url)

  return res.data
}

export function usePhone(phoneId: string) {
  return useQuery<IPhone, unknown>({
    queryKey: ['hydrate-phone-id', phoneId],
    queryFn: () => getPhone(phoneId),
  })
}
