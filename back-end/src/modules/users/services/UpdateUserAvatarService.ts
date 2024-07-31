import { InvalidateCacheUserByUserIdColaboratorLoggedService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheUserByUserIdColaboratorLoggedService'
import { InvalidateCacheUserByUserIdDashboardLoggedService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheUserByUserIdDashboardLoggedService'
import { InvalidateCacheUserByUserIdDashboardService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheUserByUserIdDashboardService'
import { Person } from '@modules/users/infra/typeprisma/entities/Person'
import IPersonsRepository from '@modules/users/repositories/IPersonsRepository'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'
import AppError from '@shared/errors/AppError'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { container, inject, injectable } from 'tsyringe'

interface IRequest {
  user_id: string
  avatarFilename?: string
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<any> {
    try {
      const checkUserExists = await this.usersRepository.findById(user_id)

      if (!checkUserExists) {
        throw new AppError('Only authenticated user can change avatar.', 401)
      }

      if (checkUserExists?.person.avatar) {
        await this.storageProvider.deleteFile(checkUserExists.person.avatar)
      }

      if (!avatarFilename) {
        throw new AppError('Only authenticated user can change avatar.', 402)
      }

      const filename = await this.storageProvider.saveFile(avatarFilename)

      const newPerson = await this.personsRepository.update({
        id: checkUserExists.person.id,
        updateData: { avatar: filename },
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

export default UpdateUserAvatarService
