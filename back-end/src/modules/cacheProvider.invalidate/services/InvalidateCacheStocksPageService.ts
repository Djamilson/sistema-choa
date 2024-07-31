import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class InvalidateCacheStocksPageService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(aggregationProductId: string): Promise<void> {
    try {
      const cachekeyStockAggregationProduct = `stock-product:${aggregationProductId}`;
      const cachekeyStocks = `stocks:${aggregationProductId}`;
      const cachekeyStocksTotal = `stocksTotal:${aggregationProductId}`;

      await this.cacheProvider.invalidate(cachekeyStocksTotal);
      await this.cacheProvider.invalidatePrefix(cachekeyStocks);
      await this.cacheProvider.invalidate(cachekeyStockAggregationProduct);
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateCacheStocksPageService };
