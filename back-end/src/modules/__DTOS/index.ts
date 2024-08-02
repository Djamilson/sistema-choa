import { ObjectId } from 'bson'

type IDataPageDTO = { page: number; pageSize: number; query: string }

type IDataPageNotInIdsDTO = {
  ids: string[]
  page: number
  pageSize: number
  query: string
}

type IDataPageAcronymDTO = {
  acronym: string
}

type IDataPageIsAcronymDTO = {
  page: number
  pageSize: number
  query: string
  isAcronym: string
}

type IDataPageByAggregationProductIdDTO = {
  aggregationProductId: string
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

type IPropsUpdateData = {
  id: string | ObjectId
  updateData: any
}

export type {
  IDataPageAcronymDTO,
  IDataPageByAggregationProductIdDTO,
  IDataPageDTO,
  IDataPageIsAcronymDTO,
  IDataPageNotInIdsDTO,
  IInfoDTO,
  IPropsUpdateData,
}
