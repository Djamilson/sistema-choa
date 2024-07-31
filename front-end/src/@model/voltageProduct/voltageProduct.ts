import { IInfoDTO } from '../__DTOS'

export type IVoltageProduct = {
  id: string
  voltage: string
  selected?: boolean
  totalVoltage: number
}

export type TVoltageProductInfo = {
  voltagesProducts: IVoltageProduct[]
  info: IInfoDTO
}
