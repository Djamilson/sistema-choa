import { IInfoDTO } from '../__DTOS'
import { IMaintenance } from '../maintenance'
import { IPhoto } from '../photo/photo'
import { IProblem } from '../problem'

export type ICar = {
  id: string
  name: string
  description: string
  acronym: string
  brand: string
  plate: string
  fuel_type: string

  maintenances: IMaintenance[]
  problems: IProblem[]
  photos?: IPhoto[]

  created_at: Date
  updated_at: Date
  thumbnail_url?: string
}

export default interface IListCars {
  cars: ICar[]
  info: IInfoDTO
}
