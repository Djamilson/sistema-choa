import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'
import AppError from '@shared/errors/AppError'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { container, inject, injectable } from 'tsyringe'
import { Photo } from '../infra/typeprisma/entities/Photo'
import { IPhotosRepository } from '../repositories/IPhotosRepository'
import { InvalidateCacheAllCarsService } from './caches/InvalidateCacheAllCarsService'
import { InvalidateCacheCarByCarIdService } from './caches/InvalidateCacheCarByCarIdService'
import { GetCarByCarIdService } from './GetCarByCarIdService'

type IRequest = {
  carId: string
  photoFilename: string
}

@injectable()
class CreatePhotoCarService {
  constructor(
    @inject('PhotosRepository')
    private photosRepository: IPhotosRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ carId, photoFilename }: IRequest): Promise<any> {
    try {
      const getCarByCarIdService = container.resolve(GetCarByCarIdService)

      const carExists = await getCarByCarIdService.execute({
        carId,
      })

      if (!carExists) {
        throw new AppError('Car not exists.', 401)
      }

      const filename = await this.storageProvider.saveFile(photoFilename)

      const photo = await this.photosRepository.create({
        name: filename,
        car_id: carId,
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

      return instanceToPlain(plainToInstance(Photo, photo))
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { CreatePhotoCarService }
