import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

@injectable()
class InvalidateCacheAggregationProductIdService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(aggregationProductId: string): Promise<void> {
    try {
      const cachekeyAggregationProduct = `aggregationProduct:${aggregationProductId}`
      const cachekeyListAggregationsProductsPaginationStocks = `listAggregationsProductsPaginationStocks`
      const cachekeyAggregationProductSimplified = `aggregationProductSimplified:${aggregationProductId}`
      const cachekeyGetAggregationProductMeDetailsByProductId = `getAggregationProductMeDetailsByProductId`

      const listAggregationsProductsPaginationStocks =
        this.cacheProvider.invalidate(
          cachekeyListAggregationsProductsPaginationStocks,
        )
      const aggregationProduct = this.cacheProvider.invalidate(
        cachekeyAggregationProduct,
      )
      const aggregationProductSimplified = this.cacheProvider.invalidate(
        cachekeyAggregationProductSimplified,
      )

      const getAggregationProductMeDetailsByProductId =
        this.cacheProvider.invalidatePrefix(
          cachekeyGetAggregationProductMeDetailsByProductId,
        )

      await Promise.all([
        listAggregationsProductsPaginationStocks,
        aggregationProduct,
        aggregationProductSimplified,
        getAggregationProductMeDetailsByProductId,
      ])
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { InvalidateCacheAggregationProductIdService }
