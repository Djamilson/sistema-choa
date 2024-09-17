import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeprisma/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class GetUserByUserIdService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<any> {
    const cachekeyUserByUseId = `userByUserId:${user_id}`;

    let userExists = await this.cacheProvider.recover<any>(cachekeyUserByUseId);

    if (!userExists) {
      const meUser = await this.usersRepository.findById(user_id);

      const userFinally = instanceToPlain(plainToInstance(User, meUser));

      await this.cacheProvider.save(cachekeyUserByUseId, userFinally);

      userExists = userFinally;
    }

    return userExists;
  }
}

export { GetUserByUserIdService };
