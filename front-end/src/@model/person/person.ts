import { IAddress } from '../address/address'
import { IPhone } from '../phone/phone'

export type IGenderEnum = 'MALE' | 'FEMALE' | 'OTHER'

export interface IPerson {
  id: string
  name: string
  email: string
  cpf: string
  cpfOrCnpjFormat?: string
  birth_date: string
  birth_dateFormat?: string
  status: boolean
  privacy: boolean
  promotional_email: boolean
  gender: IGenderEnum
  avatar?: string
  avatar_url?: string
  phone_id?: string
  address_id?: string
  address?: IAddress
  phone?: IPhone
}
