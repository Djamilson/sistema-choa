import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class InvalidateCacheSizeProductBySizeProductIdService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(sizeProductId: string): Promise<void> {
    try {
      const cachekeySizeProduct = `sizeProduct:${sizeProductId}`;

      await this.cacheProvider.invalidate(cachekeySizeProduct);
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateCacheSizeProductBySizeProductIdService };
