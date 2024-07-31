import { InvalidateCacheProductIdService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheProductIdService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { InvalidateAllCacheService } from '../../../services/InvalidateAllCacheService';

class CachesController {
  async invalidate(req: Request, res: Response): Promise<Response> {
    try {
      const invalidateAllCacheService = container.resolve(
        InvalidateAllCacheService,
      );
      await invalidateAllCacheService.execute();

      return res.status(202).json();
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
  async invalidateProductId(req: Request, res: Response): Promise<Response> {
    try {
      const { productId } = req.params;
      const invalidateCacheProductIdService = container.resolve(
        InvalidateCacheProductIdService,
      );
      await invalidateCacheProductIdService.execute(productId);

      return res.status(202).json();
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}

export { CachesController };
