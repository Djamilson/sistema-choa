import { ICar } from '../car'
import { IUser } from '../user/user'

export type IMaintenanceService = {
  id: string
  created_at: Date
  updated_at: Date

  description: string
  status: string
  date_out: Date
  date_return: Date

  car_id: string
  car: ICar
  user_who_removed_id?: string
  user_who_removed?: IUser
}
