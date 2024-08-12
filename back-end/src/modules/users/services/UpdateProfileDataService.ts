import { InvalidateCacheUserByUserIdColaboratorLoggedService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheUserByUserIdColaboratorLoggedService'
import { InvalidateCacheUserByUserIdDashboardLoggedService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheUserByUserIdDashboardLoggedService'
import { InvalidateCacheUserByUserIdDashboardService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheUserByUserIdDashboardService'
import { Person } from '@modules/users/infra/typeprisma/entities/Person'
import IPersonsRepository from '@modules/users/repositories/IPersonsRepository'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import AppError from '@shared/errors/AppError'
import { parse } from 'date-fns'
import { container, inject, injectable } from 'tsyringe'

interface IRequest {
  user_id: string
  name: string
  cpf: string
  birth_date: string
}

@injectable()
class UpdateProfileDataService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,
  ) {}

  public async execute({
    user_id,
    cpf,
    birth_date,
    name,
  }: IRequest): Promise<Person> {
    try {
      const newBirthDate = parse(birth_date, 'dd/MM/yyyy', new Date())

      const user = await this.usersRepository.findById(user_id)

      if (!user) {
        throw new AppError('User not found')
      }

      const meUpdateUser = await this.personsRepository.update({
        id: user.person_id,
        updateData: {
          name,
          cpf,
          birth_date: newBirthDate,
        },
      })

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

      return meUpdateUser
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { UpdateProfileDataService }
