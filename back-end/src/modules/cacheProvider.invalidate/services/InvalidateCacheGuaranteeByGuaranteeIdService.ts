import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class InvalidateCacheGuaranteeByGuaranteeIdService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(guaranteeId: string): Promise<void> {
    try {
      const cachekeyGuaranteeByGuaranteeId = `guarantee:${guaranteeId}`;

      await this.cacheProvider.invalidate(cachekeyGuaranteeByGuaranteeId);
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateCacheGuaranteeByGuaranteeIdService };
