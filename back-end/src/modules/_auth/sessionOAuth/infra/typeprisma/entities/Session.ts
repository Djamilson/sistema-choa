import User from '@modules/users/infra/typeprisma/entities/User'

class Session {
  user: User
  token: string
  refreshToken: string
}

export { Session }
