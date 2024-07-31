import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class InvalidateCacheVideoStatusByProductIdService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(productId: string): Promise<void> {
    try {
      const cachekeyVideos = `videos:${productId}-status`;

      await this.cacheProvider.invalidate(cachekeyVideos);
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateCacheVideoStatusByProductIdService };
