import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

@injectable()
class InvalidateCacheListTitleEcommercePaginationService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(): Promise<void> {
    try {
      const cachekey = `titlesEcommerce`
      const cachekeyallActiveTitlesEcommerce = `allActiveTitlesEcommerce`
      const cachekeyTitleEcommerce = `titleEcommerce`

      const meCachekey = this.cacheProvider.invalidatePrefix(cachekey)
      const mecachekeyTitleEcommerce = this.cacheProvider.invalidatePrefix(
        cachekeyTitleEcommerce,
      )

      const meCachekeyallActiveTitlesEcommerce = this.cacheProvider.invalidate(
        cachekeyallActiveTitlesEcommerce,
      )

      await Promise.all([
        meCachekey,
        meCachekeyallActiveTitlesEcommerce,
        mecachekeyTitleEcommerce,
      ])
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { InvalidateCacheListTitleEcommercePaginationService }
