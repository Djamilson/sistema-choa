import { SessionsColaboratorsController } from '@modules/sessions/infra/http/controllers/SessionsColaboratorsController'
import { SessionsDashBoardController } from '@modules/sessions/infra/http/controllers/SessionsDashBoardController'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'

const sessionsRouter = Router()

const sessionsDashBoardController = new SessionsDashBoardController()
const sessionsColaboratorController = new SessionsColaboratorsController()

sessionsRouter.post(
  '/dashboard',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      device: Joi.string().required(),
      software: Joi.string().required(),
      company_id: Joi.string().required(),
    },
  }),
  sessionsDashBoardController.create,
)

sessionsRouter.post(
  '/collaborators',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsColaboratorController.create,
)

export { sessionsRouter }
