import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import GetGooglesOAuthByEmailController from '../controllers/GetGooglesOAuthByEmailController'
import GetGooglesOAuthByUserIdController from '../controllers/GetGooglesOAuthByUserIdController'

const googlesOAuthsRouter = Router()

const getGooglesOAuthByUserIdController =
  new GetGooglesOAuthByUserIdController()
const getGooglesOAuthByEmailController = new GetGooglesOAuthByEmailController()

googlesOAuthsRouter.get(
  '/:userId',
  celebrate({
    [Segments.PARAMS]: {
      userId: Joi.string().required(),
    },
  }),
  getGooglesOAuthByUserIdController.show,
)

googlesOAuthsRouter.post(
  '/emails/:email',
  celebrate({
    [Segments.PARAMS]: {
      email: Joi.string().required(),
    },
    [Segments.BODY]: {
      type: Joi.string().required(),
      provider_account_id: Joi.string().required(),
    },
  }),
  getGooglesOAuthByEmailController.show,
)

export default googlesOAuthsRouter
