import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class InvalidateCacheVoltageProductByVoltageProductIdService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(voltageProductId: string): Promise<void> {
    try {
      const cachekeySizeProduct = `voltageProduct:${voltageProductId}`;

      await this.cacheProvider.invalidate(cachekeySizeProduct);
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateCacheVoltageProductByVoltageProductIdService };
