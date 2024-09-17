import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class InvalidateCacheAllUsersByUserIdAndCompanyIdDashboardLoggedPrefixService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(): Promise<void> {
    try {
      const cachekeyUserByUserIdAndCompanyIdDashboardLogged = `userByUserIdAndCompanyIdDashboardLogged`;

      await this.cacheProvider.invalidatePrefix(
        cachekeyUserByUserIdAndCompanyIdDashboardLogged,
      );
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateCacheAllUsersByUserIdAndCompanyIdDashboardLoggedPrefixService };
