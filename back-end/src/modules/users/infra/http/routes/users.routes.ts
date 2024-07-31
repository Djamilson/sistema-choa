import uploadConfig from '@config/upload'
import { GetUserByUserIdController } from '@modules/users/infra/http/controllers/GetUserByUserIdController'
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController'
import { UsersController } from '@modules/users/infra/http/controllers/UsersController'
import { ensureAuthenticated } from '@modules/users/infra/http/middleware/ensureAuthenticanted'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import multer from 'multer'
import { GetUserByUserIdAndCompanyIdDashboardLoggedController } from '../controllers/GetUserByUserIdAndCompanyIdDashboardLoggedController'
import { GetUserByUserIdColaboratorLoggedController } from '../controllers/GetUserByUserIdColaboratorLoggedController'
import { ListUsersByUserIdAndProductIdReviewsController } from '../controllers/ListUsersByUserIdAndProductIdReviewsController'

const upload = multer(uploadConfig.multer)

const usersRouter = Router()
const usersController = new UsersController()
const userAvatarController = new UserAvatarController()
const listUsersByUserIdAndProductIdReviewsController =
  new ListUsersByUserIdAndProductIdReviewsController()
const getUserByUserIdController = new GetUserByUserIdController()
const getUserByUserIdAndCompanyIdDashboardLoggedController =
  new GetUserByUserIdAndCompanyIdDashboardLoggedController()
const getUserByUserIdColaboratorLoggedController =
  new GetUserByUserIdColaboratorLoggedController()
// not logged in user

usersRouter.post(
  '/reviews/:aggregationProductId',
  celebrate({
    [Segments.PARAMS]: {
      aggregationProductId: Joi.string().required(),
    },
    [Segments.BODY]: {
      usersId: Joi.array().items(
        Joi.object().keys({
          id: Joi.string().required(),
        }),
      ),
    },
  }),
  listUsersByUserIdAndProductIdReviewsController.show,
)

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      company_id: Joi.string().required(),
      cpf: Joi.string().required(),
      groups: Joi.array().items(
        Joi.object().keys({
          id: Joi.string().required(),
        }),
      ),
    },
  }),
  usersController.create,
)

// logged
usersRouter.use(ensureAuthenticated)

usersRouter.get(
  '/info/:userId',
  celebrate({
    [Segments.PARAMS]: {
      userId: Joi.string().required(),
    },
  }),
  getUserByUserIdController.show,
)

usersRouter.get(
  '/me/dashboard/:userId/:companyId',
  celebrate({
    [Segments.PARAMS]: {
      userId: Joi.string().required(),
      companyId: Joi.string().required(),
    },
  }),
  getUserByUserIdAndCompanyIdDashboardLoggedController.show,
)

usersRouter.get(
  '/me/colaborators/:userId',
  celebrate({
    [Segments.PARAMS]: {
      userId: Joi.string().required(),
    },
  }),
  getUserByUserIdColaboratorLoggedController.show,
)

usersRouter.patch('/avatar', upload.single('file'), userAvatarController.update)

export { usersRouter }
