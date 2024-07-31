import { IBanner } from '@/@model/banner/banner'
import { api } from '@/_services/apiClient'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

type IBannersByInitialBanners = {
  publisher: boolean
  banners: IBanner[]
}

export async function getBanners(publisher: boolean): Promise<IBanner[]> {
  const url = `banners/publisher`

  const { data } = await api.get(url, {
    params: { publisher },
  })

  return data
}

export function useBannersByInitialBanners({
  publisher,
  banners,
}: IBannersByInitialBanners) {
  return useQuery<IBanner[], unknown>({
    queryKey: ['initial-banners'],
    queryFn: () => getBanners(publisher),
    initialData: banners,
  }) as UseQueryResult<IBanner[], unknown>
}

export function useBanners(publisher: boolean) {
  return useQuery<IBanner[], unknown>({
    queryKey: ['hydrate-banners'],
    queryFn: () => getBanners(publisher),
  }) as UseQueryResult<IBanner[], unknown>
}
