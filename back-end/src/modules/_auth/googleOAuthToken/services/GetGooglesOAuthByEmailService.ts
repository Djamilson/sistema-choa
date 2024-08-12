import authConfig from '@config/auth'
import { IAccountsRepository } from '@modules/_auth/account/repositories/IAccountsRepository'
import { GetUserByEmailService } from '@modules/users/services/GetUserByEmailService'
import AppError from '@shared/errors/AppError'
import dayjs from 'dayjs'
import { google } from 'googleapis'
import { sign } from 'jsonwebtoken'
import { container, inject, injectable } from 'tsyringe'

dayjs.locale('pt-br')

type IGetGooglesOAuthByEmailService = {
  email: string
  type: string
  providerAccountId: string
}

@injectable()
class GetGooglesOAuthByEmailService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,
  ) {}

  async execute({
    email,
    type,
    providerAccountId,
  }: IGetGooglesOAuthByEmailService): Promise<any | null> {
    try {
      const getUserByEmailService = container.resolve(GetUserByEmailService)

      const {
        secretToken,
        secretRefreshToken,
        expiresInToken,
        expiresInRefreshToken,
        expiresRefreshTokenDays,
      } = authConfig.jwt
      console.log(' emaillll', email)
      const userExists = await getUserByEmailService.execute({
        email,
      })

      if (!userExists) {
        throw new AppError('User not found', 401)
      }

      const PROVIDER = 'GOOGLE'
      let accountExists =
        await this.accountsRepository.getAccountByUserIdAndProvider({
          userId: userExists.id,
          provider: PROVIDER,
        })

      if (!accountExists) {
        accountExists = await this.accountsRepository.create({
          user_id: userExists.id,
          type,
          provider: PROVIDER,
          provider_account_id: providerAccountId,
        })
      }

      const roles = ['Colaborador']

      const token = sign({ roles }, secretToken, {
        subject: userExists.id,
        expiresIn: expiresInToken,
      })

      const refresh_token = sign({ email }, secretRefreshToken, {
        subject: userExists.id,
        expiresIn: expiresInRefreshToken,
      })

      const auth = new google.auth.OAuth2(
        process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID,
        process.env.NEXT_PUBLIC_AUTH_GOOGLE_SECRET,
      )

      auth.setCredentials({
        access_token: token,
        refresh_token,
        expiry_date: accountExists.expires_at
          ? accountExists.expires_at * 1000
          : null,
      })

      if (!accountExists.expires_at) {
        return auth
      }

      const isTokenExpired = dayjs(accountExists.expires_at * 1000).isBefore(
        new Date(),
      )

      if (isTokenExpired) {
        const { credentials } = await auth.refreshAccessToken()
        const {
          access_token,
          expiry_date,
          id_token,
          refresh_token,
          scope,
          token_type,
        } = credentials

        await this.accountsRepository.update({
          id: accountExists.id,
          updateData: {
            access_token,
            expires_at: expiry_date ? Math.floor(expiry_date / 1000) : null,
            id_token,
            refresh_token,
            scope,
            token_type,
          },
        })

        auth.setCredentials({
          access_token,
          refresh_token,
          expiry_date,
        })
      }

      return auth
    } catch (error: any) {
      console.log('error: google::', error)

      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { GetGooglesOAuthByEmailService }
