import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

@injectable()
class InvalidateCacheAllUserByUserIdDashboardLoggedPrefixoService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(): Promise<void> {
    try {
      const cacheAllUserByUserIdDashboardLoggedPrefixo = `userByUserIdDashboardLogged`
      await this.cacheProvider.invalidatePrefix(
        cacheAllUserByUserIdDashboardLoggedPrefixo,
      )
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { InvalidateCacheAllUserByUserIdDashboardLoggedPrefixoService }
