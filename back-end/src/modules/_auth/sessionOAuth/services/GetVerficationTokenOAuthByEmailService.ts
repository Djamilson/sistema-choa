import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ISessionsOAuthRepository } from '../repositories/ISessionsOAuthRepository'

type IGetSessionOAuthAndUserBySessionTokenService = {
  email: string
}

@injectable()
class GetVerficationTokenOAuthByEmailService {
  constructor(
    @inject('SessionsOAuthRepository')
    private sessionsOAuthRepository: ISessionsOAuthRepository,
  ) {}

  async execute({
    email,
  }: IGetSessionOAuthAndUserBySessionTokenService): Promise<any> {
    try {
      const verificationToken =
        await this.sessionsOAuthRepository.getVerificationTokenOAuthByEmailService(
          email,
        )

      if (!verificationToken) {
        throw new AppError('verificationToken does not exists.', 401)
      }

      console.log(verificationToken)

      return verificationToken
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { GetVerficationTokenOAuthByEmailService }
