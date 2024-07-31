import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { IInfoDTO } from '@modules/__DTOS';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  page: number;
  pageSize: number;
  query: string;
  labelSearch: string;
}

interface ICollaboratorsReturn {
  collaborators: any;
  info: IInfoDTO;
}

@injectable()
class CollaboratorsPaginationByCpfOrNameService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    page,
    pageSize,
    query,
    labelSearch,
  }: IRequest): Promise<ICollaboratorsReturn> {
    try {
    
      const cachekey = `collaborators:${page}-${query}-${labelSearch}`;

      let collaborators = await this.cacheProvider.recover<any>(cachekey);

      //if (!collaborators) {
      const { result, total } =
        await this.usersRepository.findCollaboratorsPaginationByCpfOrName({
          page,
          pageSize,
          query,
          labelSearch,
        });
      console.log('result, total::', result, total);
      const pages = Math.ceil(total / pageSize);

      const info = { page, pages, total, limit: pageSize };

      const finallycollaborators = {
        collaborators: result,
        info,
      };

      console.log('finallycollaborators', finallycollaborators);

      await this.cacheProvider.save(cachekey, finallycollaborators);

      collaborators = finallycollaborators;
      //}

      return collaborators;
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export default CollaboratorsPaginationByCpfOrNameService;
