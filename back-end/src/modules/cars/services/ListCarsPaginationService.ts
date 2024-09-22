import { IDataPageDTO, IInfoDTO } from '@modules/__DTOS'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import AppError from '@shared/errors/AppError'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { inject, injectable } from 'tsyringe'
import { Car } from '../infra/typeprisma/entities/Car'
import { ICarsRepository } from '../repositories/ICarsRepository'

interface ICarsReturn {
  cars: any
  info: IInfoDTO
}

@injectable()
class ListCarsPaginationService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    page,
    pageSize,
    query,
  }: IDataPageDTO): Promise<ICarsReturn> {
    try {
      console.log('poroororo cars 01', page, pageSize, query)
      const cachekeyCarsPage = `cars:${page}-${query}`

      let cars = await this.cacheProvider.recover<any>(cachekeyCarsPage)
      console.log('poroororo cars', cars)
      if (!cars) {
        const { result, total } = await this.carsRepository.allCarsPagination({
          page,
          pageSize,
          query,
        })

        const pages = Math.ceil(total / pageSize)

        const info = { page, pages, total, limit: pageSize }
        console.log('result, total', result, total)
        const meCars = {
          cars: instanceToPlain(plainToInstance(Car, result)),
          info,
        }

        if (result.length > 0) {
          await this.cacheProvider.save(cachekeyCarsPage, meCars)

          cars = meCars
        }
      }

      console.log('Estouuuodofs odufo', cars)

      return cars
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { ListCarsPaginationService }
