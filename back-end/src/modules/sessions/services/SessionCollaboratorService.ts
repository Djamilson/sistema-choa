import authConfig from '@config/auth'
import { CreateSessionOAuthService } from '@modules/_auth/sessionOAuth/services/CreateSessionOAuthService'
import { IUserSerializableDTO } from '@modules/users/dtos/IUserSerealizableDTO'
import { Person } from '@modules/users/infra/typeprisma/entities/Person'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import AppError from '@shared/errors/AppError'
import { plainToInstance } from 'class-transformer'
import { sign } from 'jsonwebtoken'
import { container, inject, injectable } from 'tsyringe'

interface IRequest {
  email: string
  password: string
}
interface IResponse {
  user: IUserSerializableDTO
  token: string
  refreshToken?: string
}

@injectable()
class SessionCollaboratorService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('DayjsDateProvider')
    private dayjsDateProvider: IDateProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const sessionOAuthService = container.resolve(CreateSessionOAuthService)
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

    /* const getVerficationTokenOAuthByEmailService = container.resolve(
      GetVerficationTokenOAuthByEmailService,
    )

    const verficationTokenOAuth =
      await getVerficationTokenOAuthByEmailService.execute({
        email,
      }) */

    const {
      secretToken,
      secretRefreshToken,
      expiresInToken,
      expiresInRefreshToken,
      expiresRefreshTokenDays,
    } = authConfig.jwt

    const roles = ['Colaborador']

    const token = sign({ roles }, secretToken, {
      subject: userExists.id,
      expiresIn: expiresInToken,
    })

    const refresh_token = sign({ email }, secretRefreshToken, {
      subject: userExists.id,
      expiresIn: expiresInRefreshToken,
    })

    const refresh_token_expires_date = this.dayjsDateProvider.addDays(
      expiresRefreshTokenDays,
    )

    /* await this.refreshesTokensRepository.create({
      user_id: userExists.id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    }) */

    const user = {
      id: userExists.id,
      is_verified: userExists.is_verified,
      roles,
      firstName: userExists.person.name.split(' ')[0],
      person: plainToInstance(Person, userExists.person),
    }

    await sessionOAuthService.execute({
      sessionToken: token,
      userId: userExists.id,
      expires: new Date(refresh_token_expires_date),
    })

    return {
      user,
      token,
      refreshToken: refresh_token,
    }
  }
}

export { SessionCollaboratorService }
