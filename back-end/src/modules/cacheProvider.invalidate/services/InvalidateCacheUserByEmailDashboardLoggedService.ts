import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class InvalidateCacheUserByEmailDashboardLoggedService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(email: string): Promise<void> {
    try {
      const cachekeyUserByEmailDashboardLogged = `userByEmailDashboardLogged:${email}`;
      await this.cacheProvider.invalidate(cachekeyUserByEmailDashboardLogged);
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateCacheUserByEmailDashboardLoggedService };
