import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

import {
  IAccountByUserIdAndProvider,
  IAccountsRepository,
} from '../repositories/IAccountsRepository'

@injectable()
class GetUserByAccountByUserIdAndProviderService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,
  ) {}

  async execute({
    userId,
    provider,
  }: IAccountByUserIdAndProvider): Promise<any | null> {
    try {
      const accountExists =
        await this.accountsRepository.getAccountByUserIdAndProvider({
          userId,
          provider,
        })

      if (!accountExists) {
        throw new AppError('Account not found')
      }

      return accountExists
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { GetUserByAccountByUserIdAndProviderService }
