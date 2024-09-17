import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import AppError from '@shared/errors/AppError'
import dayjs from 'dayjs'
import { inject, injectable } from 'tsyringe'
import { Session } from '../../../../../prisma/generated/postgres'
import {
  ICreateSessionDTO,
  ISessionsOAuthRepository,
} from '../repositories/ISessionsOAuthRepository'

dayjs.locale('pt-br')

@injectable()
class CreateSessionOAuthService {
  constructor(
    @inject('SessionsOAuthRepository')
    private sessionsOAuthRepository: ISessionsOAuthRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    expires,
    sessionToken,
    userId,
  }: ICreateSessionDTO): Promise<Session> {
    try {
      const checkUserExists = await this.usersRepository.findById(userId)

      if (!checkUserExists) {
        throw new AppError('User not exists.', 401)
      }

      const newSession = await this.sessionsOAuthRepository.create({
        expires,
        sessionToken,
        userId,
      })

      return newSession
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { CreateSessionOAuthService }
