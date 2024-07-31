import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

type IGetUserByEmailAndCpfOrCnpjService = {
  email: string
  cpfOrCnpj: string
}

@injectable()
class GetUserByEmailAndCpfOrCnpjService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    email,
    cpfOrCnpj,
  }: IGetUserByEmailAndCpfOrCnpjService): Promise<void> {
    try {
      const [checkUserEmailExists, checkUserCpfOrCnpjExists] =
        await Promise.all([
          this.usersRepository.findByEmail(email),
          this.usersRepository.findByCPF(cpfOrCnpj),
        ])

      if (checkUserEmailExists) {
        throw new AppError('Email already used.', 401)
      }

      if (checkUserCpfOrCnpjExists) {
        throw new AppError('CPForCNPJ already used.', 402)
      }
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { GetUserByEmailAndCpfOrCnpjService }
