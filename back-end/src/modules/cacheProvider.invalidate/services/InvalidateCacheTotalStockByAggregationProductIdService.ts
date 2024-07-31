import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class InvalidateCacheTotalStockByAggregationProductIdService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(aggregationProductId: string): Promise<void> {
    try {
      const cachekey = `getTotalStockAggregationProductById:${aggregationProductId}`;

      await this.cacheProvider.invalidate(cachekey);
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateCacheTotalStockByAggregationProductIdService };
