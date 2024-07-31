import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { inject, injectable } from 'tsyringe'
import { Brand } from '../infra/typeprisma/entities/Brand'
import { IBrandsRepository } from '../repositories/IBrandsRepository'

@injectable()
class ListAllBrandService {
  constructor(
    @inject('BrandsRepository')
    private BrandsRepository: IBrandsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(): Promise<Brand[] | null> {
    const cachekey = `brands`

    let brands = await this.cacheProvider.recover<Brand[]>(cachekey)

    if (brands === null) {
      brands = await this.BrandsRepository.allBrands()

      await this.cacheProvider.save(
        cachekey,
        instanceToPlain(plainToInstance(Brand, brands)),
      )
    }

    return brands
  }
}

export { ListAllBrandService }
