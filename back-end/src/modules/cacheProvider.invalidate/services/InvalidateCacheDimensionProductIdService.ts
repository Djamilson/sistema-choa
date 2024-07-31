import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class InvalidateCacheDimensionProductIdService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(dimensionProductId: string): Promise<void> {
    try {
      const cachekeyDimensionProduct = `dimensionProduct:${dimensionProductId}`;

      await this.cacheProvider.invalidate(cachekeyDimensionProduct);
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateCacheDimensionProductIdService };
