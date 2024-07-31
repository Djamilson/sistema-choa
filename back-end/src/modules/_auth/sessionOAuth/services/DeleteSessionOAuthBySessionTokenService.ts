import { inject, injectable } from 'tsyringe'
import { ISessionsOAuthRepository } from '../repositories/ISessionsOAuthRepository'
import AppError from '@shared/errors/AppError'

type IDeleteSessionOAuthBySessionTokenService = {
  sessionToken: string
}

@injectable()
class DeleteSessionOAuthBySessionTokenService {
  constructor(
    @inject('SessionsOAuthRepository')
    private sessionsOAuthRepository: ISessionsOAuthRepository,
  ) {}

  async execute({
    sessionToken,
  }: IDeleteSessionOAuthBySessionTokenService): Promise<void> {
    try {
      const sessionExists =
        await this.sessionsOAuthRepository.getSessionOAuthAndUserBySessionToken(
          sessionToken,
        )

      if (!sessionExists) {
        throw new AppError('session does not exists.', 401)
      }

      await this.sessionsOAuthRepository.deleteSession(sessionToken)
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { DeleteSessionOAuthBySessionTokenService }
