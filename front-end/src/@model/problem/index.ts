import { ICar } from '../car'
import { IUser } from '../user/user'

export type IProblem = {
  id: string
  created_at: Date
  updated_at: Date

  description: string
  status: string

  car_id: string
  car: ICar
  user_id: string
  user: IUser
}
