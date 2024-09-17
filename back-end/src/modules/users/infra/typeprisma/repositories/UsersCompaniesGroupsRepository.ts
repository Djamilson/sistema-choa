import IUsersCompaniesGroupsRepository from '@modules/users/repositories/IUsersCompaniesGroupsRepository';
import { postgres } from '@shared/infra/prisma/lib/prismaClient';

class UsersCompaniesGroupsRepository
  implements IUsersCompaniesGroupsRepository
{
  private prismaRepository = postgres;

  constructor() {
    this.prismaRepository;
  }

  /*public async findById(
    user_company_company_id: string,
    user_company_user_id: string,
  ): Promise<UserCompanyGroup | null> {
    return this.prismaRepository.userCompanyGroup.findUnique({
      where: {
        user_company_user_id_user_company_company_id_group_id: {
          user_company_company_id,
          user_company_user_id,
        },
      },
    }) as unknown as UserCompanyGroup;
  }*/

  /*public async delete(id: string): Promise<UserCompanyGroup> {
    const userCompanyGroup =
      await this.prismaRepository.userCompanyGroup.delete({
        where: {
          id,
        },
      });
    return userCompanyGroup as unknown as UserCompanyGroup;
  }*/
}

export default UsersCompaniesGroupsRepository;
