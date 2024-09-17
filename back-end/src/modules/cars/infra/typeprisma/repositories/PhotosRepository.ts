import { IPropsUpdateData } from '@modules/__DTOS'
import { ICreatePhotoDTO } from '@modules/cars/dtos/ICreatePhotoDTO'
import { IPhotosRepository } from '@modules/cars/repositories/IPhotosRepository'
import { postgres } from '@shared/infra/prisma/lib/prismaClient'
import { Photo } from '../../../../../../prisma/generated/postgres'

class PhotosRepository implements IPhotosRepository {
  private prismaRepository = postgres

  constructor() {
    this.prismaRepository
  }

  public async findPhotoByPhotoId(photoId: string): Promise<any> {
    const photo = await this.prismaRepository.photo.findUnique({
      where: { id: photoId },
      select: {
        id: true,
        name: true,
        car_id: true,
        created_at: true,
        updated_at: true,
      },
    })
    return photo as unknown as Photo
  }

  public async create(data: ICreatePhotoDTO): Promise<any> {
    return this.prismaRepository.photo.create({
      data,
      select: {
        id: true,
        name: true,
        car_id: true,
        created_at: true,
        updated_at: true,
      },
    }) as unknown as Photo
  }

  public async update({ id, updateData }: IPropsUpdateData): Promise<any> {
    const photo = await this.prismaRepository.photo.update({
      where: {
        id: String(id),
      },
      data: updateData,
      select: {
        id: true,
        name: true,
        car_id: true,
        created_at: true,
        updated_at: true,
      },
    })
    return photo as unknown as Photo
  }

  public async delete(id: string): Promise<any> {
    const photo = await this.prismaRepository.photo.delete({
      where: {
        id: String(id),
      },
      select: {
        id: true,
        name: true,
        car_id: true,
        created_at: true,
        updated_at: true,
      },
    })
    return photo as unknown as Photo
  }
}

export { PhotosRepository }
