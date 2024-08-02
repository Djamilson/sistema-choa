import IListCars, { ICar } from '@/@model/car'
import { api } from '@/_services/apiClient'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export async function getCarByCarId(carId: string): Promise<ICar> {
  const url = `cars/all/addresses/${carId}`

  const { data } = await api.get(url)

  return data
}

export async function getCars(
  page: number,
  limit: number,
  search: string,
): Promise<IListCars> {
  const url = `cars/pagination/list`

  const { data } = await api.get(url, {
    params: { page, limit, q: search },
  })

  return data
}
export function useAllCars(page: number, limit: number, search: string) {
  return useQuery({
    queryKey: ['hydrate-titles', { page: `${page}-${search}` }],
    queryFn: () => getCars(page, limit, search),
  }) as UseQueryResult<IListCars, unknown>
}
