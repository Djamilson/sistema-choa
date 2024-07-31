import { IInfoDTO } from '@/@model/__DTOS'

export type ISizeProduct = {
  id: string
  description: string
  acronym: string
  totalSize: number
  selected?: boolean
}

export type TSizeProduct = {
  sizesProducts: ISizeProduct[]
  info: IInfoDTO
}
