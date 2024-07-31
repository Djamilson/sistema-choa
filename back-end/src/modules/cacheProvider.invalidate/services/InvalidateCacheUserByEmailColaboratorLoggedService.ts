import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class InvalidateCacheUserByEmailColaboratorLoggedService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(email: string): Promise<void> {
    try {
      const cachekeyUserByEmailColaboratorLogged = `userByEmailColaboratorLogged:${email}`;
      await this.cacheProvider.invalidate(cachekeyUserByEmailColaboratorLogged);
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateCacheUserByEmailColaboratorLoggedService };
