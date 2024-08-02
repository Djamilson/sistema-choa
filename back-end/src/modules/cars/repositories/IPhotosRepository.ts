import { ICreatePhotoDTO } from '../dtos/ICreatePhotoDTO'
import { Photo } from '../infra/typeprisma/entities/Photo'

interface IPhotosRepository {
  findPhotoByPhotoId(id: string): Promise<Photo | undefined>
  listAll(): Promise<Photo[]>
  create(data: ICreatePhotoDTO): Promise<Photo>
  save(user: Photo): Promise<Photo>
  delete(id: string): Promise<void>
}

export { IPhotosRepository }
