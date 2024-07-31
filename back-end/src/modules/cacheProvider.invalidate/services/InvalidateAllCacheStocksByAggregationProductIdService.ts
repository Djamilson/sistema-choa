import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class InvalidateAllCacheStocksByAggregationProductIdService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(aggregationProductId: string): Promise<void> {
    try {
      const cachekeyStocksTotal = `stocksTotal:${aggregationProductId}`;
      const cachekeyStocks = `stocks:${aggregationProductId}`;
      const cachekeyListAggregationsProductsPaginationStocks = `listAggregationsProductsPaginationStocks`;
      const cachekeyAggregationProductSimplified = `aggregationProductSimplified:${aggregationProductId}`;

      await this.cacheProvider.invalidate(cachekeyAggregationProductSimplified);
      await this.cacheProvider.invalidate(cachekeyStocksTotal);
      await this.cacheProvider.invalidatePrefix(cachekeyStocks);
      await this.cacheProvider.invalidatePrefix(
        cachekeyListAggregationsProductsPaginationStocks,
      );
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateAllCacheStocksByAggregationProductIdService };
