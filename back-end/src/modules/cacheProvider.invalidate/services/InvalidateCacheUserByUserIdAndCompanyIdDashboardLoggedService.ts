import { IUserIdOnCompanyId } from '@modules/users/dtos/ICreateDTO';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class InvalidateCacheUserByUserIdAndCompanyIdDashboardLoggedService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute({ user_id, company_id }: IUserIdOnCompanyId): Promise<void> {
    try {
      const cachekeyUserByUserIdAndCompanyIdDashboardLogged = `userByUserIdAndCompanyIdDashboardLogged:${user_id}-${company_id}`;

      await this.cacheProvider.invalidate(
        cachekeyUserByUserIdAndCompanyIdDashboardLogged,
      );
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateCacheUserByUserIdAndCompanyIdDashboardLoggedService };
