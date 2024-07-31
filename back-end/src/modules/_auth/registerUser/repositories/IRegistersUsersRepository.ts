import { RegisterUser } from '../../../../../prisma/generated/postgres'

export type IRegistersUsersDTO = {
  code_validation: string
  email: string
  expires: Date
}

interface IRegistersUsersRepository {
  create(data: IRegistersUsersDTO): Promise<RegisterUser>
  findRegisterUserByCode(code_validation: string): Promise<RegisterUser>
}

export { IRegistersUsersRepository }
