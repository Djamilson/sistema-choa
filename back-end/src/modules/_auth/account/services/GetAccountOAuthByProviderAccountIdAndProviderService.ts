import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

import User from '@modules/users/infra/typeprisma/entities/User'
import {
  IAccountsRepository,
  IGetUserByProviderAccountIdAndProvider,
} from '../repositories/IAccountsRepository'

@injectable()
class GetAccountOAuthByProviderAccountIdAndProviderService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,
  ) {}

  async execute({
    providerAccountId,
    provider,
  }: IGetUserByProviderAccountIdAndProvider): Promise<User | null> {
    try {
      const accountExists =
        await this.accountsRepository.getUserByProviderAccountIdAndProvider({
          providerAccountId,
          provider,
        })

      if (!accountExists) {
        return null
      }

      return accountExists?.user
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { GetAccountOAuthByProviderAccountIdAndProviderService }
