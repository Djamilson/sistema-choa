import { IPropsUpdateData } from '@modules/__DTOS'
import { ICreateCarDTO, IPageCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import ITotalCarsDTO, {
  ICarsRepository,
} from '@modules/cars/repositories/ICarsRepository'
import { postgres } from '@shared/infra/prisma/lib/prismaClient'
import { Car } from '../../../../../../prisma/generated/postgres'

class CarsRepository implements ICarsRepository {
  private prismaRepository = postgres

  constructor() {
    this.prismaRepository
  }

  async totalRegister(query: string): Promise<number> {
    const result = await this.prismaRepository.car.count({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
    })

    return result
  }

  public async allCarsPagination(data: IPageCarDTO): Promise<ITotalCarsDTO> {
    const { page, pageSize, query } = data

    let carFilters = [] as Car[]

    const total = await this.totalRegister(query)

    console.log('totooti', total)

    if (total > 0) {
      carFilters = await this.prismaRepository.car.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        where: {
          name: {
            contains: query /* Optional filter */,
            mode: 'insensitive',
          },
        },
        select: {
          id: true,
          name: true,
          acronym: true,
          brand: true,
          description: true,
          fuel_type: true,
          plate: true,
          created_at: true,
          updated_at: true,
        },
        orderBy: {
          name: 'asc',
        },
      })
    }

    console.log('carFilters', carFilters)
    return {
      result: carFilters,
      total,
    }
  }

  public async findCarByName(name: string): Promise<Car | null> {
    return this.prismaRepository.car.findFirst({
      where: { name },
      select: {
        id: true,
        name: true,
        acronym: true,
        brand: true,
        description: true,
        fuel_type: true,
        plate: true,
        created_at: true,
        updated_at: true,
      },
    })
  }

  public async findCarByPlate(plate: string): Promise<any> {
    const car = await this.prismaRepository.car.findFirst({
      where: { plate },
      select: {
        id: true,
        name: true,
        acronym: true,
        brand: true,
        description: true,
        fuel_type: true,
        plate: true,
        created_at: true,
        updated_at: true,
      },
    })
    return car as unknown as Car
  }

  public async findCarByCarId(carId: string): Promise<any> {
    const car = await this.prismaRepository.car.findUnique({
      where: { id: carId },
      select: {
        id: true,
        name: true,
        acronym: true,
        brand: true,
        description: true,
        fuel_type: true,
        plate: true,
        created_at: true,
        updated_at: true,
        photos: {
          select: {
            car_id: true,
            id: true,
            name: true,
          },
        },
      },
    })
    return car as unknown as Car
  }

  public async create(data: ICreateCarDTO): Promise<Car> {
    return this.prismaRepository.car.create({
      data,
      select: {
        id: true,
        name: true,
        acronym: true,
        brand: true,
        description: true,
        fuel_type: true,
        plate: true,
        created_at: true,
        updated_at: true,
      },
    }) as unknown as Car
  }

  public async update({ id, updateData }: IPropsUpdateData): Promise<Car> {
    const car = await this.prismaRepository.car.update({
      where: {
        id: String(id),
      },
      data: updateData,
      select: {
        id: true,
        name: true,
        acronym: true,
        brand: true,
        description: true,
        fuel_type: true,
        plate: true,
        created_at: true,
        updated_at: true,
      },
    })
    return car as unknown as Car
  }
}

export { CarsRepository }
