import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class InvalidateCacheUnitMeasurementsPageService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(): Promise<void> {
    try {
      const cachekeyGetUnitMeasurement = `getUnitsMeasurements`;

      await Promise.all([
        this.cacheProvider.invalidatePrefix(cachekeyGetUnitMeasurement),
      ]);
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateCacheUnitMeasurementsPageService };
