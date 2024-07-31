import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class InvalidateCacheAllQuestionsService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(): Promise<void> {
    try {
      const cachekey = `questionsAllPage`;
      const cachekeyQuestions = `questions`;

      await this.cacheProvider.invalidatePrefix(cachekeyQuestions);
      await this.cacheProvider.invalidatePrefix(cachekey);
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateCacheAllQuestionsService };
