import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

type IProps = {
  productId: number;
};

@injectable()
class InvalidateCacheAllQuestionsPageEcommerceService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute({ productId }: IProps): Promise<void> {
    try {
      const cachekey = `questions:${productId}`;

      await this.cacheProvider.invalidatePrefix(cachekey);
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateCacheAllQuestionsPageEcommerceService };
