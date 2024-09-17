import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

@injectable()
class InvalidateCacheAllUsersByEmailColaboratorLoggedPrefixService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(): Promise<void> {
    try {
      const cachekeyUserByEmailColaboratorLogged = `userByEmailColaboratorLogged`

      await this.cacheProvider.invalidatePrefix(
        cachekeyUserByEmailColaboratorLogged,
      )
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { InvalidateCacheAllUsersByEmailColaboratorLoggedPrefixService }
