import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class InvalidateCacheAllBannersService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(): Promise<void> {
    try {
      const cachekeyBanners = `banners`;
      const cachekeyBannersPaginationPrefix = `banners`;

      await Promise.all([this.cacheProvider.invalidate(cachekeyBanners), this.cacheProvider.invalidatePrefix(cachekeyBannersPaginationPrefix)])
      
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateCacheAllBannersService };
