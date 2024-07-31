import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'

import { ensureAuthenticated } from '@modules/users/infra/http/middleware/ensureAuthenticanted'
import { BrandsController } from '../controllers/BrandsController'
import { BrandsListPaginationController } from '../controllers/BrandsListPaginationController'

import uploadConfig from '@config/upload'
import multer from 'multer'
import { UpdateLogosController } from '../controllers/UpdateLogosController'

const upload = multer(uploadConfig.multer)

const brandsRouter = Router()
const brandsController = new BrandsController()
const updateLogosController = new UpdateLogosController()
const brandsListPaginationController = new BrandsListPaginationController()

// not logged

// logged
brandsRouter.use(ensureAuthenticated)
brandsRouter.get('/', brandsController.index)
brandsRouter.get(
  '/:brandId',
  celebrate({
    [Segments.PARAMS]: {
      brandId: Joi.string().required(),
    },
  }),
  brandsController.show,
)

brandsRouter.get(
  '/pagination/list',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.string().required(),
      limit: Joi.string().required(),
      q: Joi.string().optional().allow(''),
    },
  }),
  brandsListPaginationController.index,
)

brandsRouter.post(
  '/new',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  brandsController.create,
)

brandsRouter.patch(
  '/:brandId/name',
  celebrate({
    [Segments.PARAMS]: {
      brandId: Joi.string().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  brandsController.update,
)

brandsRouter.patch(
  '/:brandId/logo',
  upload.single('file'),
  updateLogosController.update,
)

export { brandsRouter }
