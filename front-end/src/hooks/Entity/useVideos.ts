import { IVideo } from '@/@model/video/video'
import { api } from '@/_services/apiClient'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
export async function getVideos(
  productId: string,
  status: boolean,
): Promise<IVideo[]> {
  const url = `videos/products/${productId}/status`

  const { data } = await api.get(url, {
    params: { status },
  })

  return data
}

export function useVideosByInitialVideos(
  productId: string,
  status: boolean,
  videos: IVideo[],
) {
  return useQuery({
    queryKey: ['initial-videos', productId],
    queryFn: () => getVideos(productId, status),
    initialData: videos,
  }) as UseQueryResult<IVideo[], unknown>
}

export function useVideos(productId: string, status: boolean) {
  return useQuery({
    queryKey: ['hydrate-videos', productId],
    queryFn: () => getVideos(productId, status),
  }) as UseQueryResult<IVideo[], unknown>
}
