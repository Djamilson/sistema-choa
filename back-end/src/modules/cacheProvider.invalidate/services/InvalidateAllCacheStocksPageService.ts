import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class InvalidateAllCacheStocksPageService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(): Promise<void> {
    try {
      const cachekeyStockAggregationProduct = `stock-product`;
      const cachekeyStocks = `stocks`;
      const cachekeyStocksTotal = `stocksTotal`;

      await this.cacheProvider.invalidatePrefix(cachekeyStocksTotal);
      await this.cacheProvider.invalidatePrefix(cachekeyStocks);
      await this.cacheProvider.invalidatePrefix(
        cachekeyStockAggregationProduct,
      );
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateAllCacheStocksPageService };
