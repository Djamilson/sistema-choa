import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

type IProps = {
  aggregationProductId: string
  voltageProductId: string
}

@injectable()
class InvalidateCacheAllTotalStockByAggregationProductIdAndVoltageProductIdService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute({
    aggregationProductId,
    voltageProductId,
  }: IProps): Promise<void> {
    try {
      const cachekeyAllTotalStockByAggregationProductIdAndVoltageProductId = `allTotalStockByAggregationProductIdAndVoltageProductId:${aggregationProductId}-${voltageProductId}`

      await this.cacheProvider.invalidate(
        cachekeyAllTotalStockByAggregationProductIdAndVoltageProductId,
      )
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { InvalidateCacheAllTotalStockByAggregationProductIdAndVoltageProductIdService }
