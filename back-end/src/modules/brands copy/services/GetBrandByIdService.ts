import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import AppError from '@shared/errors/AppError'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { inject, injectable } from 'tsyringe'
import { Brand } from '../infra/typeprisma/entities/Brand'
import { IBrandsRepository } from '../repositories/IBrandsRepository'

type IRequest = {
  brandId: string
}

@injectable()
class GetBrandByIdService {
  constructor(
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ brandId }: IRequest): Promise<any> {
    try {
      const cachekey = `brand:${brandId}`

      let brandExists = await this.cacheProvider.recover<any>(cachekey)

      if (!brandExists) {
        brandExists = await this.brandsRepository.findById(brandId)

        if (!brandExists) {
          throw new AppError('Brand not exists.', 401)
        }

        await this.cacheProvider.save(
          cachekey,
          instanceToPlain(plainToInstance(Brand, brandExists)),
        )
      }

      return brandExists
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { GetBrandByIdService }
