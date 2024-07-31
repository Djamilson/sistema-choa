import User from '@modules/users/infra/typeprisma/entities/User'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  id: string
}

@injectable()
class FindUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<User | undefined> {
    const user = await this.usersRepository.findById(id)

    return user
  }
}

export default FindUserService
