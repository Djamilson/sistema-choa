import { IDataPageDTO, IPropsUpdateData } from '@modules/__DTOS'
import { ICreateBrandDTO } from '@modules/brands/dtos/ICreateBrandDTO'
import { ISearchNameDTO } from '@modules/brands/dtos/ISearchNameDTO'
import ITotalBrandsDTO from '@modules/brands/dtos/ITotalBrandsDTO'
import { Brand } from '@modules/brands/infra/typeprisma/entities/Brand'
import { IBrandsRepository } from '@modules/brands/repositories/IBrandsRepository'
import { postgres } from '@shared/infra/prisma/lib/prismaClient'
import { Brand as BrandPrisma } from '../../../../../../prisma/generated/postgres'

class BrandsRepository implements IBrandsRepository {
  private prismaRepository = postgres

  constructor() {
    this.prismaRepository
  }

  async totalRegister(query: string): Promise<number> {
    const result = await this.prismaRepository.brand.count({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
    })

    return result
  }

  public async allBrandsPagination(
    data: IDataPageDTO,
  ): Promise<ITotalBrandsDTO> {
    const { page, pageSize, query } = data

    let brands = [] as BrandPrisma[]

    const total = await this.totalRegister(query)

    if (total > 0) {
      brands = await this.prismaRepository.brand.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        where: {
          name: {
            contains: query,
            mode: 'insensitive',
          },
        },

        select: {
          id: true,
          name: true,
          logo: true,
          created_at: true,
          updated_at: true,
        },
        orderBy: {
          name: 'asc',
        },
      })
    }

    return {
      result: brands as unknown as Brand[],
      total,
    }
  }

  public async allBrands(): Promise<Brand[] | null> {
    const brands = await this.prismaRepository.brand.findMany({
      select: {
        id: true,
        name: true,
        logo: true,
      },
    })
    return brands as unknown as Brand[]
  }

  public async findByName({ name }: ISearchNameDTO): Promise<Brand | null> {
    try {
      const brand = await this.prismaRepository.brand.findUnique({
        where: { name },
        select: {
          id: true,
          name: true,
          logo: true,
          updated_at: true,
          created_at: true,
        },
      })
      return brand as unknown as Brand
    } catch (e) {
      return null
    }
  }

  public async findById(id: string): Promise<Brand | null> {
    console.log("mude id", id)
    const brand = await this.prismaRepository.brand.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        logo: true,
        updated_at: true,
        created_at: true,
      },
    })
    return brand as unknown as Brand
  }

  public async create(data: ICreateBrandDTO): Promise<Brand> {
    return this.prismaRepository.brand.create({
      data,
      select: {
        id: true,
        name: true,
        logo: true,
      },
    }) as unknown as Brand
  }

  public async createList(meData: ICreateBrandDTO[]): Promise<void> {
    await this.prismaRepository.brand.createMany({
      data: meData,
    })
  }

  public async update({ id, updateData }: IPropsUpdateData): Promise<Brand> {
    const brand = await this.prismaRepository.brand.update({
      where: {
        id: String(id),
      },
      data: updateData,
      select: {
        id: true,
        name: true,
        logo: true,
        created_at: true,
        updated_at: true,
      },
    })
    return brand as unknown as Brand
  }
}

export { BrandsRepository }
