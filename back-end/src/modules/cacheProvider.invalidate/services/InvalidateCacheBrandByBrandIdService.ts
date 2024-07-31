import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

@injectable()
class InvalidateCacheBrandByBrandIdService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(brandId: string): Promise<void> {
    try {
      const cachekeyBrand = `brand:${brandId}`

      await this.cacheProvider.invalidate(cachekeyBrand)
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { InvalidateCacheBrandByBrandIdService }
