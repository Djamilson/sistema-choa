import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class InvalidateCacheUnitMeasurementByUnitMeasurementIdService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(unitMeasurementId: string): Promise<void> {
    try {
      const cachekeyUnitMeasurement = `unitMeasurement:${unitMeasurementId}`;

      await Promise.all([
        this.cacheProvider.invalidate(cachekeyUnitMeasurement),
      ]);
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateCacheUnitMeasurementByUnitMeasurementIdService };
