import { IAccountsRepository } from '@modules/_auth/account/repositories/IAccountsRepository'
import AppError from '@shared/errors/AppError'
import dayjs from 'dayjs'
import { google } from 'googleapis'
import { inject, injectable } from 'tsyringe'

dayjs.locale('pt-br')

@injectable()
class GetGooglesOAuthByUserIdService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,
  ) {}

  async execute(userId: string): Promise<any | null> {
    try {
      const GOOGLE = 'google'

      const accountExists =
        await this.accountsRepository.getAccountByUserIdAndProvider({
          userId,
          provider: GOOGLE,
        })

      if (!accountExists) {
        throw new AppError('UnitMeasuremen not found')
      }

      const auth = new google.auth.OAuth2(
        process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID,
        process.env.NEXT_PUBLIC_AUTH_GOOGLE_SECRET,
      )

      auth.setCredentials({
        access_token: accountExists.access_token,
        refresh_token: accountExists.refresh_token,
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
          id: userId,
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
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { GetGooglesOAuthByUserIdService }
