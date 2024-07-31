import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class InvalidateCacheVideoByVideoIdService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(videoId: string): Promise<void> {
    try {
      const cachekeyVideo = `video:${videoId}`;

      await this.cacheProvider.invalidate(cachekeyVideo);
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export { InvalidateCacheVideoByVideoIdService };
