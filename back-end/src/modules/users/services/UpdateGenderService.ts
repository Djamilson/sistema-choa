import { InvalidateCacheUserByUserIdColaboratorLoggedService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheUserByUserIdColaboratorLoggedService'
import { InvalidateCacheUserByUserIdDashboardLoggedService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheUserByUserIdDashboardLoggedService'
import { InvalidateCacheUserByUserIdDashboardService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheUserByUserIdDashboardService'
import { Person } from '@modules/users/infra/typeprisma/entities/Person'
import IPersonsRepository from '@modules/users/repositories/IPersonsRepository'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import AppError from '@shared/errors/AppError'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { container, inject, injectable } from 'tsyringe'
import { GenresEnum } from '../../../../prisma/generated/postgres'

interface IRequest {
  user_id: string
  gender: GenresEnum
}

@injectable()
class UpdateGenderService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,
  ) {}

  public async execute({ user_id, gender }: IRequest): Promise<any> {
    try {
      const user = await this.usersRepository.findById(user_id)

      if (!user) {
        throw new AppError('User not found')
      }

      const newPerson = this.personsRepository.update({
        id: user.person.id,
        updateData: { gender },
      })

      const finallyPerson = instanceToPlain(plainToInstance(Person, newPerson))

      const invalidateCacheUserByUserIdColaboratorLoggedService =
        container.resolve(InvalidateCacheUserByUserIdColaboratorLoggedService)

      const invalidateCacheUserByUserIdDashboardLoggedService =
        container.resolve(InvalidateCacheUserByUserIdDashboardLoggedService)

      const invalidateCacheUserByUserIdDashboardService = container.resolve(
        InvalidateCacheUserByUserIdDashboardService,
      )

      await invalidateCacheUserByUserIdDashboardService.execute(user_id)
      await invalidateCacheUserByUserIdDashboardLoggedService.execute(user_id)
      await invalidateCacheUserByUserIdColaboratorLoggedService.execute(user_id)

      return finallyPerson
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { UpdateGenderService }
