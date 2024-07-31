import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'

import CreateSessionOAuthController from '../controllers/CreateSessionOAuthController'
import DeleteSessionBySessionTokenController from '../controllers/DeleteSessionOAuthBySessionTokenController'
import GetSessionOAuthAndUserBySessionTokenController from '../controllers/GetSessionOAuthAndUserBySessionTokenController'
import UpdateSessionBySessionTokenController from '../controllers/UpdateSessionOAuthBySessionTokenController'
import GetVerficationTokenOAuthByEmailController from '../controllers/GetVerficationTokenOAuthByEmailController'

const oauthSessionsRouter = Router()

const deleteSessionBySessionTokenController =
  new DeleteSessionBySessionTokenController()
const updateSessionBySessionTokenController =
  new UpdateSessionBySessionTokenController()
const getSessionOAuthAndUserBySessionTokenController =
  new GetSessionOAuthAndUserBySessionTokenController()
const createSessionOAuthController = new CreateSessionOAuthController()
const getVerficationTokenOAuthByEmailController =
  new GetVerficationTokenOAuthByEmailController()

oauthSessionsRouter.get(
  '/',
  celebrate({
    [Segments.PARAMS]: {
      sessionToken: Joi.string().required(),
    },
  }),
  getSessionOAuthAndUserBySessionTokenController.show,
)

oauthSessionsRouter.post(
  '/news',
  celebrate({
    [Segments.BODY]: {
      userId: Joi.string().required(),
      sessionToken: Joi.string().required(),
      expires: Joi.string().required(),
    },
  }),
  createSessionOAuthController.create,
)

oauthSessionsRouter.patch(
  '/:sessionToken',
  celebrate({
    [Segments.PARAMS]: {
      sessionToken: Joi.string().required(),
    },
    [Segments.BODY]: {
      userId: Joi.string().required(),
      expires: Joi.string().required(),
    },
  }),
  updateSessionBySessionTokenController.update,
)

oauthSessionsRouter.delete(
  '/:sessionToken',
  celebrate({
    [Segments.PARAMS]: {
      sessionToken: Joi.string().required(),
    },
  }),
  deleteSessionBySessionTokenController.destroy,
)

oauthSessionsRouter.get(
  '/verifications/tokens/:email',
  celebrate({
    [Segments.PARAMS]: {
      email: Joi.string().required(),
    },
  }),
  getVerficationTokenOAuthByEmailController.show,
)

export default oauthSessionsRouter
