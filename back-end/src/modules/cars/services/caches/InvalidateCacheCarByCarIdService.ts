import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

@injectable()
class InvalidateCacheCarByCarIdService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(carId: string): Promise<void> {
    try {
      await Promise.all([this.cacheProvider.invalidate(`car:${carId}`)])
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { InvalidateCacheCarByCarIdService }
