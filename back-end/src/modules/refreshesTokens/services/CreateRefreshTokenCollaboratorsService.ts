import authConfig from '@config/auth'
import { IAccountsRepository } from '@modules/_auth/account/repositories/IAccountsRepository'
import { Person } from '@modules/users/infra/typeprisma/entities/Person'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import AppError from '@shared/errors/AppError'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { sign, verify } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

interface IPayload {
  sub: string
  email: string
}

interface IUserSerializable {
  id?: string
  is_verified?: boolean
  roles?: string[]
  firstName?: string
  person: {
    phone_id?: string
    address_id?: string
    id?: string
    name?: string
    email?: string
    status?: boolean
    privacy?: boolean
    avatar?: string
    avatar_url?: () => string | null
  }
}

type ITokenResponse = {
  user: IUserSerializable
  token: string
  refreshToken: string
}

interface IRequest {
  refreshToken: string
}

@injectable()
class CreateRefreshTokenCollaboratorsService {
  constructor(
    @inject('DayjsDateProvider')
    private dayjsDateProvider: IDateProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,
  ) {}

  public async execute({
    refreshToken,
  }: IRequest): Promise<ITokenResponse | undefined | any> {
    try {
      const {
        secretToken,
        expiresInToken,
        expiresInRefreshToken,
        secretRefreshToken,
        expiresRefreshTokenDays,
      } = authConfig.jwt

      const { email, sub } = verify(
        refreshToken,
        secretRefreshToken,
      ) as IPayload

      const user_id = sub
      console.log('Refresh Token does not exists', refreshToken)

      const accountExists =
        await this.accountsRepository.getAccountByRefreshToken(refreshToken)

      console.log('Refresh Token does not exists', accountExists)

      if (!accountExists) {
        throw new AppError('Refresh Token does not exists!', 401)
      }

      const userOut = await this.usersRepository.findByEmail(email)

      const roles: string[] = ['Colaborador']

      const newToken = sign({ roles }, secretToken, {
        subject: user_id,
        expiresIn: expiresInToken,
      })

      const refresh_token = sign({ email }, secretRefreshToken, {
        subject: user_id,
        expiresIn: expiresInRefreshToken,
      })

      const refresh_token_expires_date = this.dayjsDateProvider.addDays(
        expiresRefreshTokenDays,
      )

      await this.accountsRepository.update({
        id: accountExists.id,
        updateData: {
          access_token: newToken,
          expires_at: refresh_token_expires_date,
          refresh_token,
        },
      })

      const user = {
        id: user_id,
        is_verified: userOut?.is_verified,
        roles,
        firstName: userOut?.person.name.split(' ')[0],
        person: instanceToPlain(plainToInstance(Person, userOut.person)),
      }

      return { user, token: newToken, refreshToken: refresh_token }
    } catch (error) {
      console.log('Entrou no erro', error)
      throw new AppError('Refresher token not exists.', 401)
    }
  }
}

export { CreateRefreshTokenCollaboratorsService }
