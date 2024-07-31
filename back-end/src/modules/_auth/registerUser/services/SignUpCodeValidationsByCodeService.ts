import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { IRegistersUsersRepository } from '../repositories/IRegistersUsersRepository'

type ISignUpCodeValidationsByCodeService = {
  code_validation: string
}

@injectable()
class SignUpCodeValidationsByCodeService {
  constructor(
    @inject('RegistersUsersRepository')
    private registersUsersRepository: IRegistersUsersRepository,

    @inject('DayjsDateProvider')
    private dayjsDateProvider: IDateProvider,
  ) {}

  async execute({
    code_validation,
  }: ISignUpCodeValidationsByCodeService): Promise<any> {
    try {
      const [checkRegisterUserExists] = await Promise.all([
        this.registersUsersRepository.findRegisterUserByCode(code_validation),
      ])

      if (!checkRegisterUserExists) {
        throw new AppError('code not exists.', 401)
      }

      const expires = this.dayjsDateProvider.current_date(
        checkRegisterUserExists.expires,
      )

      if (!expires) {
        throw new AppError('code expires.', 402)
      }

      return checkRegisterUserExists
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { SignUpCodeValidationsByCodeService }
