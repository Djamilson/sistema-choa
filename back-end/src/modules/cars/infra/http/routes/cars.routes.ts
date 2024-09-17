import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'

import { ensureAuthenticated } from '@modules/users/infra/http/middleware/ensureAuthenticanted'
import { CreateCarController } from '../controllers/CreateCarController'

import uploadConfig from '@config/upload'
import multer from 'multer'
import { CreatePhotoCarController } from '../controllers/CreatePhotoCarController'
import { GetCarByCarIdController } from '../controllers/GetCarByCarIdController'
import { ListCarsPaginationController } from '../controllers/ListCarsPaginationController'
import { UpdateAcronymController } from '../controllers/UpdateAcronymController'
import { UpdateBrandController } from '../controllers/UpdateBrandController'
import { UpdateDescriptionController } from '../controllers/UpdateDescriptionController'
import { UpdateFuelTypeController } from '../controllers/UpdateFuelTypeController'
import { UpdateNameController } from '../controllers/UpdateNameController'
import { UpdatePlateController } from '../controllers/UpdatePlateController2'

const upload = multer(uploadConfig.multer)

const carsRouter = Router()
const createCarController = new CreateCarController()
const listCarsPaginationController = new ListCarsPaginationController()
const getCarByCarIdController = new GetCarByCarIdController()
const updateNameController = new UpdateNameController()
const updateDescriptionController = new UpdateDescriptionController()
const updateAcronymController = new UpdateAcronymController()
const updatePlateController = new UpdatePlateController()
const updateFuelTypeController = new UpdateFuelTypeController()
const updateBrandController = new UpdateBrandController()
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
  '/:carId/description',
  celebrate({
    [Segments.PARAMS]: {
      carId: Joi.string().required(),
    },
    [Segments.BODY]: {
      description: Joi.string().required(),
    },
  }),
  updateDescriptionController.update,
)

carsRouter.patch(
  '/:carId/plate',
  celebrate({
    [Segments.PARAMS]: {
      carId: Joi.string().required(),
    },
    [Segments.BODY]: {
      plate: Joi.string().required(),
    },
  }),
  updatePlateController.update,
)

carsRouter.patch(
  '/:carId/brand',
  celebrate({
    [Segments.PARAMS]: {
      carId: Joi.string().required(),
    },
    [Segments.BODY]: {
      brand: Joi.string().required(),
    },
  }),
  updateBrandController.update,
)

carsRouter.patch(
  '/:carId/fuel_type',
  celebrate({
    [Segments.PARAMS]: {
      carId: Joi.string().required(),
    },
    [Segments.BODY]: {
      fuel_type: Joi.string().required(),
    },
  }),
  updateFuelTypeController.update,
)

carsRouter.patch(
  '/:carId/acronym',
  celebrate({
    [Segments.PARAMS]: {
      carId: Joi.string().required(),
    },
    [Segments.BODY]: {
      acronym: Joi.string().required(),
    },
  }),
  updateAcronymController.update,
)

carsRouter.patch(
  '/photos',
  upload.single('file'),
  createPhotoCarController.create,
)

export { carsRouter }
