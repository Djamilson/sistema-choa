import AppError from '@shared/errors/AppError'
import { container, inject, injectable } from 'tsyringe'
import { ICarsRepository } from '../repositories/ICarsRepository'
import { InvalidateCacheAllCarsService } from './caches/InvalidateCacheAllCarsService'
import { InvalidateCacheCarByCarIdService } from './caches/InvalidateCacheCarByCarIdService'
import { GetCarByCarIdService } from './GetCarByCarIdService'

type IRequest = {
  carId: string
  brand: string
}

@injectable()
class UpdateBrandService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  public async execute({ carId, brand }: IRequest): Promise<any> {
    try {
      const checkCarExists = await this.carsRepository.findCarByCarId(carId)

      if (!checkCarExists) {
        throw new AppError('Car not exists', 401)
      }

      await this.carsRepository.update({
        id: carId,
        updateData: {
          brand,
        },
      })

      const invalidateCacheAllCarsService = container.resolve(
        InvalidateCacheAllCarsService,
      )

      const invalidateCacheCarByCarIdService = container.resolve(
        InvalidateCacheCarByCarIdService,
      )

      await Promise.all([
        invalidateCacheAllCarsService.execute(),
        invalidateCacheCarByCarIdService.execute(carId),
      ])

      const getCarByCarIdService = container.resolve(GetCarByCarIdService)

      const car = await getCarByCarIdService.execute({ carId })

      return car
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { UpdateBrandService }
