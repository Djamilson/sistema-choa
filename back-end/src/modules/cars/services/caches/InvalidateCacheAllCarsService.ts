import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

@injectable()
class InvalidateCacheAllCarsService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(): Promise<void> {
    try {
      await Promise.all([this.cacheProvider.invalidatePrefix(`car`)])
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { InvalidateCacheAllCarsService }
