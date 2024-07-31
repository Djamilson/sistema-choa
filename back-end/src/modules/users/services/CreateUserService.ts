import IGroupsRepository from '@modules/users/repositories/IGroupsRepository'
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import User from '@modules/users/infra/typeprisma/entities/User'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

type IGroupRequest = {
  id: string
}
interface IRequest {
  name: string
  email: string
  password: string
  cpf: string
  groups: IGroupRequest[]
  company_id: string
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
    cpf,
    groups,
    company_id,
  }: IRequest): Promise<User> {
    try {
      const checkUserExists = await this.usersRepository.findByEmail(email)

      if (checkUserExists) {
        throw new AppError('Email already used.', 401)
      }

      const hashedPassword = await this.hashProvider.generateHash(password)

      const personSerealizable = {
        name,
        status: true,
        email,
        cpf,
        birth_date: new Date(),
      }

      const roles = await this.groupsRepository.findAllById(
        groups.map((group) => group.id),
      )

      const user = await this.usersRepository.create({
        person: personSerealizable,
        password: hashedPassword,
        groups: roles.map((group) => {
          return {
            company_id,
            group_id: group.id,
          }
        }),
      })

      return user
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export default CreateUserService
