import { IDataPageDTO, IInfoDTO } from '@modules/__DTOS'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { inject, injectable } from 'tsyringe'
import { Brand } from '../infra/typeprisma/entities/Brand'
import { IBrandsRepository } from '../repositories/IBrandsRepository'

interface IBrandsReturn {
  brands: any
  info: IInfoDTO
}

@injectable()
class ListBrandsPaginationService {
  constructor(
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    page,
    pageSize,
    query,
  }: IDataPageDTO): Promise<IBrandsReturn> {
    const cachekeyBrandsPage = `brands-pages:${page}-${pageSize}-${query}`

    let brands = await this.cacheProvider.recover<any>(cachekeyBrandsPage)

    if (!brands) {
      const { result, total } = await this.brandsRepository.allBrandsPagination(
        {
          page,
          pageSize,
          query,
        },
      )

      const pages = Math.ceil(total / pageSize)

      const info = { page, pages, total, limit: pageSize }

      const meBrands = {
        brands: instanceToPlain(plainToInstance(Brand, result)),
        info,
      }

      console.log('brands', meBrands)

      await this.cacheProvider.save(cachekeyBrandsPage, meBrands)

      brands = meBrands
    }

    return brands
  }
}

export { ListBrandsPaginationService }
