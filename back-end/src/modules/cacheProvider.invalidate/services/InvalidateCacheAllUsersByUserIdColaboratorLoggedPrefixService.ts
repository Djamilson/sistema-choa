import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class InvalidateCacheAllUsersByUserIdColaboratorLoggedPrefixService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(): Promise<void> {
    try {
      const cachekeyUserByUserIdColaboratorLogged = `userByUserIdColaboratorLogged`;

      await this.cacheProvider.invalidatePrefix(
        cachekeyUserByUserIdColaboratorLogged,
      );
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateCacheAllUsersByUserIdColaboratorLoggedPrefixService };
