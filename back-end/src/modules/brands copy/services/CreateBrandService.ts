import { ICreateBrandDTO } from '@modules/brands/dtos/ICreateBrandDTO'
import { Brand } from '@modules/brands/infra/typeprisma/entities/Brand'
import { IBrandsRepository } from '@modules/brands/repositories/IBrandsRepository'
import { InvalidateCacheAllBrandsService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheAllBrandsService'
import { InvalidateCacheBrandsPageService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheBrandsPageService'
import AppError from '@shared/errors/AppError'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { container, inject, injectable } from 'tsyringe'

@injectable()
class CreateBrandService {
  constructor(
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository,
  ) {}

  async execute({ name }: ICreateBrandDTO): Promise<any> {
    const brandExists = await this.brandsRepository.findByName({
      name,
    })

    if (brandExists) {
      throw new AppError('Brand already used.', 401)
    }

    const myBrand = await this.brandsRepository.create({ name })

    const invalidateCacheAllBrandService = container.resolve(
      InvalidateCacheAllBrandsService,
    )

    const invalidateCacheBrandsPageService = container.resolve(
      InvalidateCacheBrandsPageService,
    )

    await invalidateCacheBrandsPageService.execute()
    await invalidateCacheAllBrandService.execute()

    return instanceToPlain(plainToInstance(Brand, myBrand))
  }
}

export { CreateBrandService }
