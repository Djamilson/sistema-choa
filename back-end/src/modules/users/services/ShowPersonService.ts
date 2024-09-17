import { Person } from '@modules/users/infra/typeprisma/entities/Person';
import IPersonsRepository from '@modules/users/repositories/IPersonsRepository';
import AppError from '@shared/errors/AppError';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  person_id: string;
}

@injectable()
class ShowPersonService {
  constructor(
    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,
  ) {}

  public async execute({ person_id }: IRequest): Promise<any> {
    const person = await this.personsRepository.findById(person_id);

    if (!person) {
      throw new AppError('Person not found');
    }

    return instanceToPlain(plainToInstance(Person, person));
  }
}

export { ShowPersonService };
