import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

import { IVerificationTokensRepository } from '../repositories/IVerificationTokensRepository'

@injectable()
class CreateVerificationTokenService {
  constructor(
    @inject('VerificationTokensRepository')
    private verificationTokensRepository: IVerificationTokensRepository,
  ) {}

  async execute(token: string): Promise<undefined> {
    try {
      /* const verificationTokensExists =
        await this.verificationTokensRepository.getVerificationTokenByToken(
          token,
        )
      if (!verificationTokensExists) {
        throw new AppError('Token not found', 401)
      }

      // verificar si el token ya expiró
      if (verificationTokensExists.expires < new Date()) {
        throw new AppError('Token expired', 402)
      } */
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { CreateVerificationTokenService }
