import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

@injectable()
class InvalidateCacheGetProductAndAggregationsByProductIdService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(productId: string): Promise<void> {
    try {
      const cachekeyProductId = `getProductAndAggregationsByProductId:${productId}`
      const cachekeyGetProductMeDetailsByProductId = `getProductMeDetailsByProductId:${productId}`
      const cachekeyListAggregationProductMeDetailsByProductId = `getAggregationProductMeDetailsByProductId:${productId}`
      const cachekeyGetAggregationProductMeDetailsByAggregationProductId = `getAggregationProductMeDetailsByAggregationProductId`

      await Promise.all([
        this.cacheProvider.invalidate(cachekeyGetProductMeDetailsByProductId),
        this.cacheProvider.invalidate(cachekeyProductId),
        this.cacheProvider.invalidate(
          cachekeyListAggregationProductMeDetailsByProductId,
        ),
        this.cacheProvider.invalidatePrefix(
          cachekeyGetAggregationProductMeDetailsByAggregationProductId,
        ),
      ])
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { InvalidateCacheGetProductAndAggregationsByProductIdService }
