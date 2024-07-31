import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class InvalidateCacheAllUsersByEmailDashboardLoggedPrefixService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(): Promise<void> {
    try {
      const cachekeyUserByEmailDashboardLogged = `userByEmailDashboardLogged`;

      await this.cacheProvider.invalidatePrefix(
        cachekeyUserByEmailDashboardLogged,
      );
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateCacheAllUsersByEmailDashboardLoggedPrefixService };
