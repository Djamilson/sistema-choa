import { Person } from '@modules/users/infra/typeprisma/entities/Person';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
  }: IRequest): Promise<any> {
    const user = await this.usersRepository.findByIdInfoUser(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const roles = user?.usersGroups?.map(userGroup => {
      return userGroup.group.description;
    });

    const userSerealizable = {
      id: user.id,
      is_verified: user.is_verified,
      roles,
      firstName: user.person.name.split(' ')[0],

      person: instanceToPlain(plainToInstance(Person, user.person)),
    };

    return userSerealizable;
  }
}

export default ShowUserService;
