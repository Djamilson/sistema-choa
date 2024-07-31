import { Group } from '@modules/users/infra/typeprisma/entities/Group'
import User from '@modules/users/infra/typeprisma/entities/User'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import AppError from '@shared/errors/AppError'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { inject, injectable } from 'tsyringe'

type IGetUserByUserIdService = {
  userId: string
}

type IGroupCompanyProps = {
  status: boolean
  company_id?: string
  group: Group
}

@injectable()
class GetUserByUserIdService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ userId }: IGetUserByUserIdService): Promise<any> {
    try {
      const checkUserExists = await this.usersRepository.findById(userId)

      if (!checkUserExists) {
        throw new AppError('User not exists.', 401)
      }
      const { id, person_id, person, is_verified } = checkUserExists

      const myUse = {
        id,
        person_id,
        person,
        is_verified,
        roles:
          checkUserExists.users_companies_groups?.map(
            (item: IGroupCompanyProps) => item.group.name,
          ) || [],
      }

      const u = instanceToPlain(plainToInstance(User, myUse))

      console.log('vou enviar 022', u)

      return u
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { GetUserByUserIdService }
