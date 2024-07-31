import { ensureAuthenticated } from '@modules/users/infra/http/middleware/ensureAuthenticanted';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { CachesController } from '../controllers/CachesController';

const cachesRouter = Router();

const cachesController = new CachesController();

cachesRouter.use(ensureAuthenticated);

// => /caches
cachesRouter.get('/invalidates', cachesController.invalidate);
cachesRouter.get(
  '/invalidates/products/:productId',
  celebrate({
    [Segments.PARAMS]: {
      productId: Joi.string().required(),
    },
  }),
  cachesController.invalidateProductId,
);

export default cachesRouter;
