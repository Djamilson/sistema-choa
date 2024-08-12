import { IFilterOff } from '@/@model/filter/filterOff/filterOff'
import { IFilterPrice } from '@/@model/filter/price/filterPrice'
import { api } from '@/_services/apiClient'

export type IFilterProps = {
  page: number
  limit: number
  publisher: boolean
  search: string
  filterOptionSearchOffs: IFilterOff[]
  filterOptionSearchPrices: IFilterPrice[]
}

export async function getAnalytics(): Promise<void> {
  const url = `pages/accesses/counter`
  // await api.post(url, { metadata: ctx.req.headers })
  await api.post(url)
}
