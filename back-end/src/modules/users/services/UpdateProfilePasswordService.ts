import { InvalidateCacheUserByUserIdColaboratorLoggedService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheUserByUserIdColaboratorLoggedService'
import { InvalidateCacheUserByUserIdDashboardLoggedService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheUserByUserIdDashboardLoggedService'
import { InvalidateCacheUserByUserIdDashboardService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheUserByUserIdDashboardService'
import User from '@modules/users/infra/typeprisma/entities/User'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import AppError from '@shared/errors/AppError'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { container, inject, injectable } from 'tsyringe'

interface IRequest {
  user_id: string
  old_password?: string
  password?: string
}

@injectable()
class UpdateProfilePasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    old_password,
    password,
  }: IRequest): Promise<any> {
    try {
      console.log(
        ' user_id   old_password   password',
        user_id,
        old_password,
        password,
      )
      const user = await this.usersRepository.findById(user_id)

      console.log(' --1')
      if (!user) {
        throw new AppError('User not found')
      }

      if (password && !old_password) {
        throw new AppError(
          'You need to inform the old password to set a new password.',
        )
      }

      console.log(' --2')

      if (password && old_password) {
        console.log(' --3')
        const checkOldPassword = await this.hashProvider.compareHash(
          old_password,
          user.password,
        )

        console.log(' --4')

        if (!checkOldPassword) {
          throw new AppError('Old password does not match.')
        }

        const newPassword = await this.hashProvider.generateHash(password)

        console.log('--5')
        await this.usersRepository.update({
          id: user.id,
          updateData: { password: newPassword },
        })
      }

      const userFinally = instanceToPlain(plainToInstance(User, user))

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

      return userFinally
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export default UpdateProfilePasswordService
