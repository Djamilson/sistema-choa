import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeprisma/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  company_id: string;
}

@injectable()
class GetUserByUserIdAndCompanyIdDashboardLoggedService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id, company_id }: IRequest): Promise<any> {
    const cachekeyUserByUserIdDashboardLogged = `userByUserIdDashboardLogged:${user_id}`;
    let userExists = await this.cacheProvider.recover<any>(
      cachekeyUserByUserIdDashboardLogged,
    );

    if (!userExists) {
      const meUser =
        await this.usersRepository.getUserByUserIdAndCompanyIdDashboardLogged({
          user_id,
          company_id,
        });

      const myUser = {
        id: meUser.id,
        is_verified: meUser.is_verified,
        roles: meUser?.users_companies_groups.map(
          (item: any) => item.group.description,
        ),
        firstName: meUser.person.name.split(' ')[0],
        person: meUser.person,
      };

      const userFinally = instanceToPlain(plainToInstance(User, myUser));

      await this.cacheProvider.save(
        cachekeyUserByUserIdDashboardLogged,
        userFinally,
      );

      userExists = userFinally;
    }

    return userExists;
  }
}

export { GetUserByUserIdAndCompanyIdDashboardLoggedService };
