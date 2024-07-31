import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class InvalidateCacheProductDataSheetsByProductIdService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(productId: string): Promise<void> {
    try {
      const cachekeyProductDataSheet = `dataSheet:product-${productId}`;

      await this.cacheProvider.invalidate(cachekeyProductDataSheet);
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateCacheProductDataSheetsByProductIdService };
