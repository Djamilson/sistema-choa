import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class InvalidateCacheAllUsersReviewsByPrefixUserService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(): Promise<void> {
    try {
      const cachekeyListUsersByUserIdAndProductIdReviews = `usersIdReviews`;

      await this.cacheProvider.invalidatePrefix(
        cachekeyListUsersByUserIdAndProductIdReviews,
      );
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateCacheAllUsersReviewsByPrefixUserService };
