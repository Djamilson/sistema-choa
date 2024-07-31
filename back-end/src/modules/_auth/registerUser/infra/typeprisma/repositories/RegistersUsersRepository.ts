import {
  IRegistersUsersDTO,
  IRegistersUsersRepository,
} from '@modules/_auth/registerUser/repositories/IRegistersUsersRepository'
import { postgres } from '@shared/infra/prisma/lib/prismaClient'
import { RegisterUser } from '../../../../../../../prisma/generated/postgres'

class RegistersUsersRepository implements IRegistersUsersRepository {
  private prismaRepository = postgres

  constructor() {
    this.prismaRepository
  }

  public async create(data: IRegistersUsersDTO): Promise<RegisterUser> {
    return this.prismaRepository.registerUser.create({
      data,
    })
  }

  public async findRegisterUserByCode(
    code_validation: string,
  ): Promise<RegisterUser> {
    const registerUser = await this.prismaRepository.registerUser.findUnique({
      where: { code_validation },
      select: {
        id: true,
        code_validation: true,
        email: true,
        expires: true,
        created_at: true,
        updated_at: true,
      },
    })

    return registerUser as unknown as RegisterUser
  }
}

export default RegistersUsersRepository
