import { verify } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import authConfig from '@config/auth'

import AppError from '@shared/errors/AppError'

import IForgotTokensRepository from '@modules/users/repositories/IForgotTokensRepository'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

interface IRequest {
  token: string
  password: string
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ForgotTokensRepository')
    private forgotTokensRepository: IForgotTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    try {
      const userToken = await this.forgotTokensRepository.findByToken(token)

      if (!userToken) {
        throw new AppError('User token does not exists')
      }

      verify(userToken.token, authConfig.jwt.secretForgotToken)

      const user = await this.usersRepository.findById(userToken.user_id)

      if (!user) {
        throw new AppError('User token does not exists')
      }

      user.password = await this.hashProvider.generateHash(password)

      await this.usersRepository.update(user)

      return this.forgotTokensRepository.delete(userToken.id)
    } catch (err: any) {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          throw new AppError('token.invalid!', 401)
        }
      }
      throw new AppError('Token invalid.', 401)
    }
  }
}

export default ResetPasswordService
