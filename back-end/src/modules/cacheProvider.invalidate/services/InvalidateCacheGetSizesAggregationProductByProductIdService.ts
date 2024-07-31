import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class InvalidateCacheGetSizesAggregationProductByProductIdService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(productId: string): Promise<void> {
    try {
      const cacheGetSizesAggregationProductByProductId = `getSizesAggregationProductByProductId:${productId}`;


      await this.cacheProvider.invalidate(
        cacheGetSizesAggregationProductByProductId,
      );
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateCacheGetSizesAggregationProductByProductIdService };
