import IGroupsRepository from '@modules/users/repositories/IGroupsRepository'
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import User from '@modules/users/infra/typeprisma/entities/User'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import AppError from '@shared/errors/AppError'
import { generatePassword } from '@shared/util/generatePassword'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  name: string
  email: string
  avatar?: string
}

@injectable()
class CreateUserByProviderService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute({ name, email, avatar }: IRequest): Promise<User> {
    try {
      const checkUserExists = await this.usersRepository.findByEmail(email)

      if (checkUserExists) {
        throw new AppError('Email already used.', 401)
      }
      const HASHED_PASSWORD_INITIAL =
        await this.hashProvider.generateHash(generatePassword())
      const ROLE_CLIENT_INITIAL = 'role-client'
      const COMPANY_ID_INITIAL = '0000-0000-0000-0000'
      const CPF_INITIAL = email

      const personSerealizable = {
        name,
        status: true,
        email,
        cpf: CPF_INITIAL,
        avatar,
        birth_date: new Date(),
      }

      const group = await this.groupsRepository.findByName(ROLE_CLIENT_INITIAL)
      if (!group) {
        throw new AppError('Group roles not exists.', 402)
      }

      const user = await this.usersRepository.create({
        person: personSerealizable,
        password: HASHED_PASSWORD_INITIAL,
        groups: [
          {
            company_id: COMPANY_ID_INITIAL,
            group_id: group.id,
          },
        ],
      })

      return user
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export default CreateUserByProviderService
