import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class InvalidateCachekeyAllAggregationsProductsEcommerceSearchService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(): Promise<void> {
    try {
      const cachekeyAggregationsProductsEcommerceSearch = `aggregationsProductsEcommerceSearchSearch`;
      const cachekeyListAggregationsProductsPaginationDashboard = `listAggregationsProductsPaginationDashboard`;

      await this.cacheProvider.invalidatePrefix(
        cachekeyListAggregationsProductsPaginationDashboard,
      );
      await this.cacheProvider.invalidatePrefix(
        cachekeyAggregationsProductsEcommerceSearch,
      );
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateCachekeyAllAggregationsProductsEcommerceSearchService };
