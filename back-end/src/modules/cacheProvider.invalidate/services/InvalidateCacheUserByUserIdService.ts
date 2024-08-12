import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class InvalidateCacheUserByUserIdService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(userId: string): Promise<void> {
    try {
      const cachekeyUserByUseId = `userByUserId:${userId}`;

      await this.cacheProvider.invalidate(cachekeyUserByUseId);
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateCacheUserByUserIdService };
