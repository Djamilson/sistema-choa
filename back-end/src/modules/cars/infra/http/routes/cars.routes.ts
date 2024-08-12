import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'

import { ensureAuthenticated } from '@modules/users/infra/http/middleware/ensureAuthenticanted'
import { CreateCarController } from '../controllers/CreateCarController'

import uploadConfig from '@config/upload'
import multer from 'multer'
import { CreatePhotoCarController } from '../controllers/CreatePhotoCarController'
import { GetCarByCarIdController } from '../controllers/GetCarByCarIdController'
import { ListCarsPaginationController } from '../controllers/ListCarsPaginationController'
import { UpdateNameController } from '../controllers/UpdateNameController'

const upload = multer(uploadConfig.multer)

const carsRouter = Router()
const createCarController = new CreateCarController()
const listCarsPaginationController = new ListCarsPaginationController()
const getCarByCarIdController = new GetCarByCarIdController()
const updateNameController = new UpdateNameController()
const createPhotoCarController = new CreatePhotoCarController()

// not logged

// logged
carsRouter.use(ensureAuthenticated)
// carsRouter.get('/', carsController.index)
carsRouter.get(
  '/:carId',
  celebrate({
    [Segments.PARAMS]: {
      carId: Joi.string().required(),
    },
  }),
  getCarByCarIdController.show,
)

carsRouter.get(
  '/pagination/list',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.string().required(),
      limit: Joi.string().required(),
      q: Joi.string().optional().allow(''),
    },
  }),
  listCarsPaginationController.index,
)

carsRouter.post(
  '/new',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      acronym: Joi.string().required(),
      brand: Joi.string().required(),
      description: Joi.string().optional().allow(''),
      fuel_type: Joi.string().required(),
      plate: Joi.string().required(),
    },
  }),
  createCarController.create,
)

carsRouter.patch(
  '/:carId/name',
  celebrate({
    [Segments.PARAMS]: {
      carId: Joi.string().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  updateNameController.update,
)

carsRouter.patch(
  '/photos',
  upload.single('file'),
  createPhotoCarController.create,
)

export { carsRouter }
