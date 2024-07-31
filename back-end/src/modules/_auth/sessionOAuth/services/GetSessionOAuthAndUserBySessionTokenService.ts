import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ISessionsOAuthRepository } from '../repositories/ISessionsOAuthRepository'

type IGetSessionOAuthAndUserBySessionTokenService = {
  sessionToken: string
}

@injectable()
class GetSessionOAuthAndUserBySessionTokenService {
  constructor(
    @inject('SessionsOAuthRepository')
    private sessionsOAuthRepository: ISessionsOAuthRepository,
  ) {}

  async execute({
    sessionToken,
  }: IGetSessionOAuthAndUserBySessionTokenService): Promise<any> {
    try {
      const sessionExists =
        await this.sessionsOAuthRepository.getSessionOAuthAndUserBySessionToken(
          sessionToken,
        )

      if (!sessionExists) {
        throw new AppError('session does not exists.', 401)
      }

      console.log(sessionExists)

      return sessionExists
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { GetSessionOAuthAndUserBySessionTokenService }
