import { IPropsUpdateData } from '@modules/__DTOS'
import { ICreatePhotoDTO } from '../dtos/ICreatePhotoDTO'
import { Photo } from '../infra/typeprisma/entities/Photo'

interface IPhotosRepository {
  findPhotoByPhotoId(photoId: string): Promise<any>
  create(data: ICreatePhotoDTO): Promise<Photo>
  update({ id, updateData }: IPropsUpdateData): Promise<Photo>
  delete(id: string): Promise<any>
}

export { IPhotosRepository }
