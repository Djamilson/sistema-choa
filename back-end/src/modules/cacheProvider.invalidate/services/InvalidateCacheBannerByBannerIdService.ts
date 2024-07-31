import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class InvalidateCacheBannerByBannerIdService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(bannerId: string): Promise<void> {
    try {
      const cachekeyBanner = `banner:${bannerId}`;

      await this.cacheProvider.invalidate(cachekeyBanner);
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateCacheBannerByBannerIdService };
