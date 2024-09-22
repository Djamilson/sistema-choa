import IListCars, { ICar } from '@/@model/car'
import { api } from '@/_services/apiClient'
import { useQuery } from '@tanstack/react-query'

export async function getCarByCarId(carId: string): Promise<ICar> {
  const url = `cars/${carId}`

  const { data } = await api.get(url)

  return data
}

export async function getCars(
  page: number,
  limit: number,
  search: string,
): Promise<IListCars> {
  const url = `cars/pagination/list`

  console.log('Estou vai', page, limit, search)
  const { data } = await api.get(url, {
    params: { page, limit, q: search },
  })

  console.log('Estou com erroo', data)
  const initialCars = {
    cars: [],
    info: {
      page: 0,
      pages: 0,
      total: 0,
      limit: 0,
    },
  }

  return data || initialCars
}
export function useAllCars(page: number, limit: number, search: string) {
  return useQuery<IListCars>({
    queryKey: ['hydrate-cars-page', { page: `${page}-${search}` }],
    queryFn: () => getCars(page, limit, search),
  })
}

export function useCarByCarId(carId: string) {
  return useQuery<ICar>({
    queryKey: ['hydrate-car', carId],
    queryFn: () => getCarByCarId(carId),
  })
}
