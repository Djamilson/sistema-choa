import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class InvalidateCacheAllPoliticsSummariesService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(): Promise<void> {
    try {
      const cachekeyAllPoliticsSummaries = `allPoliticsSummaries`;
      const cachekeyAllPoliticsSummariesEcommerce = `allPoliticsSummariesEcommerce`;

      await this.cacheProvider.invalidate(cachekeyAllPoliticsSummaries);
      await this.cacheProvider.invalidate(
        cachekeyAllPoliticsSummariesEcommerce,
      );
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateCacheAllPoliticsSummariesService };
