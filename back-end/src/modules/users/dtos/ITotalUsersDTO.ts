import User from '@modules/users/infra/typeprisma/entities/User'

export type ITotalUsersDTO = {
  result: User[]
  total: number
}
