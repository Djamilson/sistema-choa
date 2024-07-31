import { InvalidateCacheUserByUserIdColaboratorLoggedService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheUserByUserIdColaboratorLoggedService'
import { InvalidateCacheUserByUserIdDashboardLoggedService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheUserByUserIdDashboardLoggedService'
import { InvalidateCacheUserByUserIdDashboardService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheUserByUserIdDashboardService'
import User from '@modules/users/infra/typeprisma/entities/User'
import IPersonsRepository from '@modules/users/repositories/IPersonsRepository'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import AppError from '@shared/errors/AppError'
import { postgres } from '@shared/infra/prisma/lib/prismaClient'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { container, inject, injectable } from 'tsyringe'

interface IRequest {
  userId: string
  name: string
  email: string
  avatar_url: string
}

@injectable()
class UpdateCollaboratorService {
  private prismaRepository = postgres

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,
  ) {
    this.prismaRepository
  }

  public async execute({
    userId,
    name,
    email,
    avatar_url,
  }: IRequest): Promise<any> {
    try {
      const checkUserExists = await this.usersRepository.findById(userId)

      if (!checkUserExists) {
        throw new AppError('User not found ...', 401)
      }

      const personWithUpdatedEmail =
        await this.personsRepository.findByEmail(email)

      if (personWithUpdatedEmail && personWithUpdatedEmail.id !== userId) {
        throw new AppError('E-mail already in use.', 401)
      }

      await this.personsRepository.update({
        id: checkUserExists.person.id,
        updateData: { email, name, avatar: avatar_url },
      })

      const invalidateCacheUserByUserIdColaboratorLoggedService =
        container.resolve(InvalidateCacheUserByUserIdColaboratorLoggedService)

      const invalidateCacheUserByUserIdDashboardLoggedService =
        container.resolve(InvalidateCacheUserByUserIdDashboardLoggedService)

      const invalidateCacheUserByUserIdDashboardService = container.resolve(
        InvalidateCacheUserByUserIdDashboardService,
      )

      await Promise.all([
        invalidateCacheUserByUserIdDashboardService.execute(userId),
        invalidateCacheUserByUserIdDashboardLoggedService.execute(userId),
        invalidateCacheUserByUserIdColaboratorLoggedService.execute(userId),
      ])

      const newUser = await this.usersRepository.findById(userId)

      return instanceToPlain(plainToInstance(User, newUser))
    } catch (error: any) {
      console.log('Error: update user: ', error)
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { UpdateCollaboratorService }
