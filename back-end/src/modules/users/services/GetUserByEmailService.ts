import User from '@modules/users/infra/typeprisma/entities/User'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import AppError from '@shared/errors/AppError'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  email: string
}

@injectable()
class GetUserByEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<any> {
    try {
      console.log('my email:', email)

      const userExists = await this.usersRepository.findByEmail(email)
      if (!userExists) {
        throw new AppError('User does not exists.', 401)
      }
      const user = instanceToPlain(plainToInstance(User, userExists))

      console.log('vou enviar', user)

      return user
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { GetUserByEmailService }
