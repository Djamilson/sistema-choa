import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

@injectable()
class InvalidateCacheAllProductsService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(): Promise<void> {
    try {
      const cachekeyProducts = `products`
      const cachekeyProductsCategories = `products-categories`
      const cachekeyProductsForAddCategory = `products-for-add-category`
      const cachekeyCategories = `categories`

      const cachekeyListAggregationsProductsPaginationStocks = `listAggregationsProductsPaginationStocks`

      await Promise.all([
        this.cacheProvider.invalidate(
          cachekeyListAggregationsProductsPaginationStocks,
        ),
        this.cacheProvider.invalidatePrefix(cachekeyCategories),
        this.cacheProvider.invalidatePrefix(cachekeyProductsForAddCategory),
        this.cacheProvider.invalidatePrefix(cachekeyProductsCategories),
        this.cacheProvider.invalidatePrefix(cachekeyProducts),
      ])
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { InvalidateCacheAllProductsService }
