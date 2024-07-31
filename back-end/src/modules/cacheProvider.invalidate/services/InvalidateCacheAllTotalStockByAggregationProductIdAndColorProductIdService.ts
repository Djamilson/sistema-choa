import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

type IProps = {
  aggregationProductId: string;
  colorProductId: string;
};

@injectable()
class InvalidateCacheAllTotalStockByAggregationProductIdAndColorProductIdService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute({
    aggregationProductId,
    colorProductId,
  }: IProps): Promise<void> {
    try {
      const cachekeyAllTotalStockByAggregationProductIdAndColorProductId = `allTotalStockByAggregationProductIdAndColorProductId:${aggregationProductId}-${colorProductId}`;

      await this.cacheProvider.invalidate(
        cachekeyAllTotalStockByAggregationProductIdAndColorProductId,
      );
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateCacheAllTotalStockByAggregationProductIdAndColorProductIdService };
