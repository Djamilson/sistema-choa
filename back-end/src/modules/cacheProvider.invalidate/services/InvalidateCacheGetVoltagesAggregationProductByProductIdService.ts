import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class InvalidateCacheGetVoltagesAggregationProductByProductIdService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(productId: string): Promise<void> {
    try {
      const cacheGetVoltagesAggregationProductByProductId = `getVoltagesAggregationProductByProductId:${productId}`;

      await this.cacheProvider.invalidate(
        cacheGetVoltagesAggregationProductByProductId,
      );
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateCacheGetVoltagesAggregationProductByProductIdService };
