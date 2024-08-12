import { IPropsUpdateData } from '@modules/__DTOS'
import { Car } from '../../../../prisma/generated/postgres'
import { ICreateCarDTO, IPageCarDTO } from '../dtos/ICreateCarDTO'

export default interface ITotalCarsDTO {
  result: Car[]
  total: number
}

interface ICarsRepository {
  allCarsPagination(data: IPageCarDTO): Promise<ITotalCarsDTO>
  findCarByName(name: string): Promise<Car | null>
  findCarByPlate(plate: string): Promise<Car | null>
  findCarByCarId(id: string): Promise<Car | null>
  create(data: ICreateCarDTO): Promise<Car>
  update({ id, updateData }: IPropsUpdateData): Promise<Car>
}

export { ICarsRepository }
