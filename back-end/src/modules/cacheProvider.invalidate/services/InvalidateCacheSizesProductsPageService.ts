import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class InvalidateCacheSizesProductsPageService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(): Promise<void> {
    try {
      const cachekeySizesProductsPage = `sizes-products`;
      const cachekeyAcronymSizesProductsPage = `acronym-sizes-products`;
      const cachekeyIsAcronymSizesProductsPage = `is-acronym-sizes-products`;

      await this.cacheProvider.invalidatePrefix(
        cachekeyIsAcronymSizesProductsPage,
      );
      await this.cacheProvider.invalidatePrefix(cachekeySizesProductsPage);
      await this.cacheProvider.invalidate(
        cachekeyAcronymSizesProductsPage,
      );
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateCacheSizesProductsPageService };
