import { Person } from '@modules/users/infra/typeprisma/entities/Person'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import AppError from '@shared/errors/AppError'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  user_id: string
}

@injectable()
class GetUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<any> {
    const user = await this.usersRepository.findByIdInfoPerson(user_id)

    if (!user) {
      throw new AppError('User not found')
    }

    const userSerealizable = {
      id: user.id,
      is_verified: user.is_verified,
      firstName: user.person.name.split(' ')[0],

      person: instanceToPlain(plainToInstance(Person, user.person)),
    }

    return userSerealizable
  }
}

export default GetUserService
