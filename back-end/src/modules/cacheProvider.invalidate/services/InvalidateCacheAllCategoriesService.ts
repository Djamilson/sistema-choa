import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import AppError from '@shared/errors/AppError'
import { container, inject, injectable } from 'tsyringe'
import { InvalidateCacheAllListCategoriesNotInIdsPaginationByProductIdService } from './InvalidateCacheAllListCategoriesNotInIdsPaginationByProductIdService'

@injectable()
class InvalidateCacheAllCategoriesService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(): Promise<void> {
    try {
      const invalidateCacheAllListCategoriesNotInIdsPaginationByProductIdService =
        container.resolve(
          InvalidateCacheAllListCategoriesNotInIdsPaginationByProductIdService,
        )

      const cachekeyCategories = `categories`

      await Promise.all([
        invalidateCacheAllListCategoriesNotInIdsPaginationByProductIdService.execute(),
        this.cacheProvider.invalidatePrefix(cachekeyCategories),
      ])
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { InvalidateCacheAllCategoriesService }
