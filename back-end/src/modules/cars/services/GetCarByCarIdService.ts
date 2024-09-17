import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import AppError from '@shared/errors/AppError'
import { getUrlImage } from '@shared/util/getUrlImage'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { inject, injectable } from 'tsyringe'
import { Car } from '../infra/typeprisma/entities/Car'
import { Photo } from '../infra/typeprisma/entities/Photo'
import { ICarsRepository } from '../repositories/ICarsRepository'

type IRequest = {
  carId: string
}

@injectable()
class GetCarByCarIdService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ carId }: IRequest): Promise<any> {
    try {
      const cachekey = `car:${carId}`

      let carExists = await this.cacheProvider.recover<any>(cachekey)

      if (!carExists) {
        carExists = await this.carsRepository.findCarByCarId(carId)

        if (!carExists) {
          throw new AppError('Car not exists.', 401)
        }

        carExists = {
          ...carExists,
          thumbnail_url:
            carExists?.photos && carExists.photos?.length > 0
              ? getUrlImage(carExists.photos[0].name)
              : null,
          photos: instanceToPlain(
            plainToInstance(Photo, carExists?.photos ? carExists.photos : []),
          ),
        }

        await this.cacheProvider.save(
          cachekey,
          instanceToPlain(plainToInstance(Car, carExists)),
        )
      }

      return carExists
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { GetCarByCarIdService }
