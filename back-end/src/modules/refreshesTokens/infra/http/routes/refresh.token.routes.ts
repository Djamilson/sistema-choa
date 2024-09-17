import { RefreshTokenCollaboratorsController } from '@modules/refreshesTokens/infra/http/controllers/RefreshTokenCollaboratorsController'
import { RefreshTokenDashboardController } from '@modules/refreshesTokens/infra/http/controllers/RefreshTokenDashboardController'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'

const refreshTokenRouter = Router()

const refreshTokenController = new RefreshTokenDashboardController()

const refreshTokenCollaboratorsController =
  new RefreshTokenCollaboratorsController()

refreshTokenRouter.get(
  '/dashboard/update',
  celebrate({
    [Segments.QUERY]: {
      refreshToken: Joi.string().required(),
      company_id: Joi.string().required(),
    },
  }),
  refreshTokenController.index,
)

refreshTokenRouter.get(
  '/collaborators/update',
  celebrate({
    [Segments.QUERY]: {
      refreshToken: Joi.string().required(),
    },
  }),
  refreshTokenCollaboratorsController.index,
)

export { refreshTokenRouter }
