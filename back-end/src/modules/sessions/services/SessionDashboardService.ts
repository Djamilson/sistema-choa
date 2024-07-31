import authConfig from '@config/auth'
import IRefreshesTokensRepository from '@modules/refreshesTokens/repositories/IRefreshesTokensRepository'
import { IUserSerializableDTO } from '@modules/users/dtos/IUserSerealizableDTO'
import { Person } from '@modules/users/infra/typeprisma/entities/Person'
import { UserCompanyGroup } from '@modules/users/infra/typeprisma/entities/UserCompanyGroup'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import AppError from '@shared/errors/AppError'
import { plainToInstance } from 'class-transformer'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  email: string
  password: string
  software: string
  device: string
  company_id: string
}
interface IResponse {
  user: IUserSerializableDTO
  token: string
  refreshToken?: string
}

@injectable()
class SessionDashboardService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RefreshesTokensRepository')
    private refreshesTokensRepository: IRefreshesTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('DayjsDateProvider')
    private dayjsDateProvider: IDateProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    email,
    password,
    software,
    device,
    company_id,
  }: IRequest): Promise<IResponse> {
    const userExists = await this.usersRepository.findByEmail(email)

    if (!userExists) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      userExists.password,
    )

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 402)
    }

    let roles: string[]

    const meRoles = userExists?.users_companies_groups.filter(
      (userCompany: UserCompanyGroup) => userCompany.company_id === company_id,
    )

    // eslint-disable-next-line prefer-const
    roles =
      meRoles && meRoles.length > 0
        ? meRoles?.map((item: any) => {
            return item.group.description
          })
        : []

    const {
      secretToken,
      secretRefreshToken,
      expiresInToken,
      expiresInRefreshToken,
      expiresRefreshTokenDays,
    } = authConfig.jwt

    const token = sign({ roles }, secretToken, {
      subject: userExists.id,
      expiresIn: expiresInToken,
    })
    console.log('passou 03')

    const refresh_token = sign({ email }, secretRefreshToken, {
      subject: userExists.id,
      expiresIn: expiresInRefreshToken,
    })
    console.log('passou 034')

    const refresh_token_expires_date = this.dayjsDateProvider.addDays(
      expiresRefreshTokenDays,
    )
    console.log('passou 035')

    const listRefreshTokensUser =
      await this.refreshesTokensRepository.findRefresherTokenToUserIdInDevice({
        user_id: userExists.id,
        device,
        software,
      })

    console.log('passou 02', JSON.stringify(listRefreshTokensUser, null, 2))
    if (listRefreshTokensUser && listRefreshTokensUser.length > 0) {
      const serealizable = listRefreshTokensUser.map(
        (refreshToken) => refreshToken.id,
      )
      await this.refreshesTokensRepository.deleteListIds(serealizable)
    }
    console.log('passou 03')

    await Promise.all([
      this.cacheProvider.returnPrefixCache(),

      this.refreshesTokensRepository.create({
        user_id: userExists.id,
        refresh_token,
        expires_date: refresh_token_expires_date,
        device,
        software,
      }),
    ])

    console.log('passou 04')

    const user = {
      id: userExists.id,
      is_verified: userExists.is_verified,
      roles,
      firstName: userExists.person.name.split(' ')[0],
      person: plainToInstance(Person, userExists.person),
    }

    return {
      user,
      token,
      refreshToken: refresh_token,
    }
  }
}

export { SessionDashboardService }
