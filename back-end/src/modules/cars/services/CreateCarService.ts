import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { Car } from '@modules/cars/infra/typeprisma/entities/Car'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import AppError from '@shared/errors/AppError'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { container, inject, injectable } from 'tsyringe'
import { InvalidateCacheAllCarsService } from './caches/InvalidateCacheAllCarsService'

@injectable()
class CreateCarService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({
    name,
    acronym,
    brand,
    description,
    fuel_type,
    plate,
  }: ICreateCarDTO): Promise<any> {
    try {
      const carExists = await this.carsRepository.findCarByName(name)

      if (carExists) {
        throw new AppError('Car already used.', 401)
      }

      const myCar = await this.carsRepository.create({
        name,
        acronym,
        brand,
        description,
        fuel_type,
        plate,
      })

      const invalidateCacheAllCarsService = container.resolve(
        InvalidateCacheAllCarsService,
      )
      await Promise.all([invalidateCacheAllCarsService.execute()])

      return instanceToPlain(plainToInstance(Car, myCar))
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { CreateCarService }
