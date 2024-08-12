import { InvalidateCacheAllBrandsService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheAllBrandsService'
import { InvalidateCacheBrandByBrandIdService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheBrandByBrandIdService'
import { InvalidateCacheBrandByBrandNameService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheBrandByBrandNameService'
import AppError from '@shared/errors/AppError'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { container, inject, injectable } from 'tsyringe'
import { Brand } from '../infra/typeprisma/entities/Brand'
import { IBrandsRepository } from '../repositories/IBrandsRepository'
import { GetBrandByIdService } from './GetBrandByIdService'

interface IRequest {
  brandId: string
  name: string
}

@injectable()
class UpdateNameBrandService {
  constructor(
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository,
  ) {}

  async execute({ brandId, name }: IRequest): Promise<any> {
    try {
      const getBrandByIdService = container.resolve(GetBrandByIdService)

      const brandExists = await getBrandByIdService.execute({
        brandId,
      })

      if (!brandExists) {
        throw new AppError('Brand not found')
      }

      const brandWithUpdatedExists = await this.brandsRepository.findByName({
        name,
      })

      if (brandWithUpdatedExists && brandWithUpdatedExists.id !== brandId) {
        throw new AppError('Brand already in use.', 402)
      }

      const meBrand = await this.brandsRepository.update({
        id: brandId,
        updateData: { name },
      })

      const invalidateCacheBrandByBrandIdService = container.resolve(
        InvalidateCacheBrandByBrandIdService,
      )
      const invalidateCacheBrandByBrandNameService = container.resolve(
        InvalidateCacheBrandByBrandNameService,
      )

      const invalidateCacheAllBrandsService = container.resolve(
        InvalidateCacheAllBrandsService,
      )

      await Promise.all([
        invalidateCacheBrandByBrandIdService.execute(meBrand.id),
        invalidateCacheAllBrandsService.execute(),
        invalidateCacheBrandByBrandNameService.execute(brandExists.name),
      ])

      return instanceToPlain(plainToInstance(Brand, meBrand))
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { UpdateNameBrandService }
