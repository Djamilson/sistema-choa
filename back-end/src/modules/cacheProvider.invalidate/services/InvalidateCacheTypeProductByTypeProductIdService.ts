import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class InvalidateCacheTypeProductByTypeProductIdService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(typeProductId: string): Promise<void> {
    try {
      const cachekeyTypeProduct = `typeProduct:${typeProductId}`;

      await this.cacheProvider.invalidate(cachekeyTypeProduct);
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateCacheTypeProductByTypeProductIdService };
