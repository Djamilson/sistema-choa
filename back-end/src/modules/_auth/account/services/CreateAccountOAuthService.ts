import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { Account } from '../../../../../prisma/generated/postgres'
import {
  IAccountsRepository,
  ICreateAccountDTO,
} from '../repositories/IAccountsRepository'

@injectable()
class CreateAccountOAuthService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,
  ) {}

  async execute({
    access_token,
    expires_at,
    id_token,
    provider,
    provider_account_id,
    refresh_token,
    scope,
    session_state,
    token_type,
    type,
    user_id,
  }: ICreateAccountDTO): Promise<Account> {
    try {
      const accountExists =
        await this.accountsRepository.getAccountByProviderAccountIdAndUserId({
          userId: user_id,
          providerAccountId: provider_account_id,
        })

      if (accountExists) {
        const updateAccount = await this.accountsRepository.update({
          id: accountExists.id,
          updateData: {
            access_token,
            expires_at,
            id_token,
            provider: provider.toLowerCase(),
            provider_account_id,
            refresh_token,
            scope,
            session_state,
            token_type,
            type,
            user_id,
          },
        })

        return updateAccount
      } else {
        const newAccount = await this.accountsRepository.create({
          access_token,
          expires_at,
          id_token,
          provider: provider.toLowerCase(),
          provider_account_id,
          refresh_token,
          scope,
          session_state,
          token_type,
          type,
          user_id,
        })

        return newAccount
      }
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { CreateAccountOAuthService }
