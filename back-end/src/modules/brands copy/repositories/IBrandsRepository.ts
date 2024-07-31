import { IDataPageDTO, IPropsUpdateData } from '@modules/__DTOS'
import { ICreateBrandDTO } from '../dtos/ICreateBrandDTO'
import ITotalBrandsDTO from '../dtos/ITotalBrandsDTO'
import { Brand } from '../infra/typeprisma/entities/Brand'

export type IPropsSearch = {
  name: string
}

interface IBrandsRepository {
  allBrands(): Promise<Brand[] | null>
  allBrandsPagination(data: IDataPageDTO): Promise<ITotalBrandsDTO>
  findByName(data: IPropsSearch): Promise<Brand | null>
  findById(id: string): Promise<Brand | null>
  create(data: ICreateBrandDTO): Promise<Brand>
  createList(meData: ICreateBrandDTO[]): Promise<void>
  update({ id, updateData }: IPropsUpdateData): Promise<Brand>
}

export { IBrandsRepository }
