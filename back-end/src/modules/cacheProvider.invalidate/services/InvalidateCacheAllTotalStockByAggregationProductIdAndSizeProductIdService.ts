import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

type IProps = {
  aggregationProductId: string;
  sizeProductId: string;
};

@injectable()
class InvalidateCacheAllTotalStockByAggregationProductIdAndSizeProductIdService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute({
    aggregationProductId,
    sizeProductId,
  }: IProps): Promise<void> {
    try {
      const cachekeyAllTotalStockByAggregationProductIdAndSizeProductId = `allTotalStockByAggregationProductIdAndSizeProductId:${aggregationProductId}-${sizeProductId}`;

      await this.cacheProvider.invalidate(
        cachekeyAllTotalStockByAggregationProductIdAndSizeProductId,
      );
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateCacheAllTotalStockByAggregationProductIdAndSizeProductIdService };
