type IDataPageDTO = {
  page: number
  pageSize: number
  query: string
}

type IInfoDTO = {
  page: number
  pages: number
  total: number
  limit: number
}

export type { IDataPageDTO, IInfoDTO }
