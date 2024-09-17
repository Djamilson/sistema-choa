import { Phone } from '@modules/users/infra/typeprisma/entities/Phone';
import IPersonsRepository from '@modules/users/repositories/IPersonsRepository';
import IPhonesRepository from '@modules/users/repositories/IPhonesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  phoneId: string;
  user_id: string;
}

@injectable()
class UpdatePhoneMainService {
  constructor(
    @inject('PhonesRepository')
    private phonesRepository: IPhonesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,
  ) {}

  public async execute({
    phoneId,
    user_id,
  }: IRequest): Promise<Phone | undefined> {
    try {
      const checkPhoneExists = await this.phonesRepository.findById(phoneId);

      if (!checkPhoneExists) {
        throw new AppError('Phone not exist.');
      }

      const user = await this.usersRepository.findById(user_id);

      if (!user) {
        throw new AppError('User not found');
      }

      await this.personsRepository.update({
        id: user.person_id,
        updateData: { phone_id: phoneId },
      });

      return checkPhoneExists;
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { UpdatePhoneMainService };
