import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class InvalidateCacheGetColorsAggregationProductByProductIdService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(productId: string): Promise<void> {
    try {
      const cacheGetColorsAggregationProductByProductId = `getColorsAggregationProductByProductId:${productId}`;

      await this.cacheProvider.invalidate(
        cacheGetColorsAggregationProductByProductId,
      );
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateCacheGetColorsAggregationProductByProductIdService };
