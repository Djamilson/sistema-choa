import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ISessionsOAuthRepository } from '../repositories/ISessionsOAuthRepository'

type IUpdateSessionOAuthBySessionTokenService = {
  sessionToken: string
  userId: string
  expires: string
}

@injectable()
class UpdateSessionOAuthBySessionTokenService {
  constructor(
    @inject('SessionsOAuthRepository')
    private sessionsOAuthRepository: ISessionsOAuthRepository,
  ) {}

  async execute({
    sessionToken,
    userId,
    expires,
  }: IUpdateSessionOAuthBySessionTokenService): Promise<any | null> {
    try {
      const sessionExists =
        await this.sessionsOAuthRepository.getSessionOAuthAndUserBySessionToken(
          sessionToken,
        )

      if (!sessionExists) {
        throw new AppError('session does not exists.', 401)
      }

      const sessionUpDate = await this.sessionsOAuthRepository.update({
        session_token: sessionToken,
        updateData: {
          user_id: userId,
          expires,
        },
      })

      return {
        sessionToken: sessionUpDate.session_token,
        userId: sessionUpDate.user_id,
        expires: sessionUpDate.expires,
      }
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { UpdateSessionOAuthBySessionTokenService }
