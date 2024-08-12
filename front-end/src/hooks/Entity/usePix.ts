import { api } from '@/_services/apiClient'
import { useQuery } from '@tanstack/react-query'

export async function getLocIdPix(locIdPix: string): Promise<any> {
  const url = `gerencianet/pixs/${locIdPix}`

  const { data } = await api.get(url)

  console.log('DATATA Pix:', data)

  return data.qrcodeImage
}

export function useQrCodeImagePixIdByLocIdPix(locIdPix: string) {
  return useQuery<any, unknown>({
    queryKey: ['hydrate-qr-code-pix', locIdPix],
    queryFn: () => getLocIdPix(locIdPix),
  })
}
