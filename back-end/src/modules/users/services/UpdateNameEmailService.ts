import { Person } from '@modules/users/infra/typeprisma/entities/Person';
import IPersonsRepository from '@modules/users/repositories/IPersonsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
}

@injectable()
class UpdateNameEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,
  ) {}

  public async execute({ user_id, name, email }: IRequest): Promise<any> {
    try {
      const user = await this.usersRepository.findById(user_id);

      if (!user) {
        throw new AppError('User not found');
      }

      const userWithUpdatedEmail = await this.usersRepository.findByEmail(
        email,
      );

      if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
        throw new AppError('E-mail already in use.');
      }

      const { id } = user.person;

      const personUpdate = this.personsRepository.update({
        id,
        updateData: {
          name,
          email,
        },
      });

      console.log(
        'PPPPass',
        JSON.stringify(
          instanceToPlain(plainToInstance(Person, personUpdate)),
          null,
          2,
        ),
      );

      return instanceToPlain(plainToInstance(Person, personUpdate));
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { UpdateNameEmailService };
