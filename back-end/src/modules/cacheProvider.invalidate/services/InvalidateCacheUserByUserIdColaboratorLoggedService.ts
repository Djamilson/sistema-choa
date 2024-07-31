import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class InvalidateCacheUserByUserIdColaboratorLoggedService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(userId: string): Promise<void> {
    try {
      const cachekeyUserByUserIdColaboratorLogged = `userByUserIdColaboratorLogged:${userId}`;

      await this.cacheProvider.invalidate(cachekeyUserByUserIdColaboratorLogged);
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateCacheUserByUserIdColaboratorLoggedService };
