import { InvalidateCacheAllBrandsService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheAllBrandsService'
import { InvalidateCacheBrandByBrandIdService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheBrandByBrandIdService'
import { InvalidateCacheBrandByBrandNameService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheBrandByBrandNameService'
import { InvalidateCacheBrandsPageService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheBrandsPageService'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'
import AppError from '@shared/errors/AppError'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { container, inject, injectable } from 'tsyringe'
import { Brand } from '../infra/typeprisma/entities/Brand'
import { IBrandsRepository } from '../repositories/IBrandsRepository'
import { GetBrandByIdService } from './GetBrandByIdService'

interface IRequest {
  brandId: string
  logoFilename: string
}

@injectable()
class UpdateLogoService {
  constructor(
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ brandId, logoFilename }: IRequest): Promise<any> {
    try {
      const getBrandByBrandIdService = container.resolve(GetBrandByIdService)

      const brandExists = (await getBrandByBrandIdService.execute({
        brandId,
      })) as unknown as Brand

      if (!brandExists) {
        throw new AppError('Brand not exists.', 401)
      }

      const filename = await this.storageProvider.saveFile(logoFilename)

      const updateThumbnailBrand = this.brandsRepository.update({
        id: brandId,
        updateData: { logo: filename },
      })

      if (brandExists.logo) {
        await this.storageProvider.deleteFile(brandExists.logo)
      }

      const meBrand = instanceToPlain(
        plainToInstance(Brand, updateThumbnailBrand),
      )

      // invalidate caches

      const invalidateCacheBrandByBrandIdService = container.resolve(
        InvalidateCacheBrandByBrandIdService,
      )

      const invalidateCacheAllBrandService = container.resolve(
        InvalidateCacheAllBrandsService,
      )

      const invalidateCacheBrandsPageService = container.resolve(
        InvalidateCacheBrandsPageService,
      )

      const invalidateCacheBrandByBrandNameService = container.resolve(
        InvalidateCacheBrandByBrandNameService,
      )
      await Promise.all([
        invalidateCacheBrandByBrandNameService.execute(brandExists.name),
        invalidateCacheBrandByBrandIdService.execute(brandId),
        invalidateCacheBrandsPageService.execute(),
        invalidateCacheAllBrandService.execute(),
      ])

      return meBrand
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { UpdateLogoService }
