import { IDataPageDTO, IPropsUpdateData } from '@modules/__DTOS'
import {
  ICreatePersonAndPhoneAndAddressDTO,
  ICreateUserCollaborationDTO,
  ICreateUserCollaborationDashboardDTO,
  ICreateUserDTO,
  IUserIdOnCompanyId,
} from '@modules/users/dtos/ICreateDTO'
import User from '@modules/users/infra/typeprisma/entities/User'
import { IUserId } from '@modules/users/services/ListUsersByUserIdAndProductIdReviewsService'
import { ITotalUsersDTO } from '../dtos/ITotalUsersDTO'

export type IDataPageCollaboratorsDTO = {
  page: number
  pageSize: number
  query: string
  labelSearch: string
}

export default interface IUsersRepository {
  allUsersPagination(data: IDataPageDTO): Promise<ITotalUsersDTO>

  findByIdNotPassword(id: string): Promise<any>
  listUsersByUserIdAndProductIdReviews(listUserIds: IUserId[]): Promise<any>

  findById(id: string): Promise<any>
  getUserByUserIdAndCompanyIdDashboardLogged({
    user_id,
    company_id,
  }: IUserIdOnCompanyId): Promise<any>
  getUserByUserIdColaboratorLogged(id: string): Promise<any>

  findByIdAllData(id: string): Promise<any>
  findByEmail(email: string): Promise<any>

  findByCPF(cpf: string): Promise<any>
  findByIdInfoUser(userId: string): Promise<User | null>
  findByIdInfoPerson(userId: string): Promise<User>
  findCollaboratorsPaginationByCpfOrName(
    data: IDataPageCollaboratorsDTO,
  ): Promise<ITotalUsersDTO>

  createPersonAndPhoneAndAddresss({
    user,
    address,
    phone,
  }: ICreatePersonAndPhoneAndAddressDTO): Promise<any>

  create(data: ICreateUserDTO): Promise<User>
  createCollaborator(data: ICreateUserCollaborationDTO): Promise<User>
  createCollaboratorDashBoard(
    data: ICreateUserCollaborationDashboardDTO,
  ): Promise<User>

  update({ id, updateData }: IPropsUpdateData): Promise<User>
}
