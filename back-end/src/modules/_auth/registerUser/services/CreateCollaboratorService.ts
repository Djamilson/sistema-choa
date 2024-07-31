import User from '@modules/users/infra/typeprisma/entities/User'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import AppError from '@shared/errors/AppError'
import { postgres } from '@shared/infra/prisma/lib/prismaClient'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  name: string
  email: string
  phone: string
  password: string
  birth_date: string
  cpf: string
}

@injectable()
class CreateCollaboratorService {
  private prismaRepository = postgres

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {
    this.prismaRepository
  }

  public async execute({
    name,
    email,
    phone,
    password,
    birth_date,
    cpf,
  }: IRequest): Promise<any> {
    try {
      const checkUserExists = await this.usersRepository.findByEmail(email)

      if (checkUserExists) {
        throw new AppError('Email already used...', 401)
      }

      const newUser = await this.usersRepository.createCollaborator({
        person: {
          name,
          email,
          birth_date: new Date(birth_date),
          cpf,
        },
        password,
        phone,
      })

      return instanceToPlain(plainToInstance(User, newUser))
    } catch (error: any) {
      console.log('Error: create user: ', error)
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { CreateCollaboratorService }
