import { ITitleEcommerce } from '@/@model/titleEcommerce/titleEcommerce'
import { api } from '@/_services/apiClient'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

export async function getAllActiveTitlesEcommerce(): Promise<
  ITitleEcommerce[]
> {
  const url = `titles`

  const { data } = await api.get(url)

  return data
}

export function useTitlesEcommercesByInitialTitles(
  titleEcommerces: ITitleEcommerce[],
) {
  return useQuery({
    queryKey: ['initial-titles-ecommerces'],
    queryFn: () => getAllActiveTitlesEcommerce(),
    initialData: titleEcommerces,
  }) as UseQueryResult<ITitleEcommerce[], unknown>
}

export function useTitlesEcommerces() {
  return useQuery<ITitleEcommerce[], unknown>({
    queryKey: ['hydrate-titles-ecommerces'],
    queryFn: () => getAllActiveTitlesEcommerce(),
  })
}
