import User from '@modules/users/infra/typeprisma/entities/User'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import AppError from '@shared/errors/AppError'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { inject, injectable } from 'tsyringe'
import { Person } from '../infra/typeprisma/entities/Person'

interface IRequest {
  user_id: string
}

@injectable()
class GetUserByUserIdColaboratorLoggedService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<any> {
    try {
      const cachekeyUserByUseId = `userByUserIdColaboratorLogged:${user_id}`

      let userExists = await this.cacheProvider.recover<any>(
        cachekeyUserByUseId,
      )

      if (!userExists) {
        const meUser = await this.usersRepository.findById(user_id)

        if (!meUser) {
          throw new AppError('User not found')
        }

        const userSerealizable = {
          id: meUser.id,
          is_verified: meUser.is_verified,
          firstName: meUser.person.name.split(' ')[0],
          roles: ['Colaborador'],

          person: instanceToPlain(plainToInstance(Person, meUser.person)),
        }

        const userFinally = instanceToPlain(
          plainToInstance(User, userSerealizable),
        )

        await this.cacheProvider.save(cachekeyUserByUseId, userFinally)

        userExists = userFinally
      }

      return userExists
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { GetUserByUserIdColaboratorLoggedService }
