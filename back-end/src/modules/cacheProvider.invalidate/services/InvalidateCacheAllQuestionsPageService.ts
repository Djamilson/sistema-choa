import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

type IProps = {
  page: number;
};

@injectable()
class InvalidateCacheAllQuestionsPageService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute({ page }: IProps): Promise<void> {
    try {
      const cachekey = `questionsAllPage:${page}`;

      await this.cacheProvider.invalidate(cachekey);
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateCacheAllQuestionsPageService };
