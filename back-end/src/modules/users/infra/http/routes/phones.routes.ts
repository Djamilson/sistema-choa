import PhoneMainController from '@modules/users/infra/http/controllers/PhoneMainController'
import PhonesController from '@modules/users/infra/http/controllers/PhonesController'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { ensureAuthenticated } from '../middleware/ensureAuthenticanted'

const phonesRouter = Router()
const phonesController = new PhonesController()
const phoneMainController = new PhoneMainController()

phonesRouter.use(ensureAuthenticated)

phonesRouter.post(
  '/users',
  celebrate({
    [Segments.BODY]: {
      phone: Joi.string().required(),
    },
  }),
  phonesController.create,
)

phonesRouter.get('/users', phonesController.index)
phonesRouter.get('/:phoneId', phonesController.show)
phonesRouter.delete('/:phoneId', phonesController.destroy)
phonesRouter.put(
  '/users/:phoneId',
  celebrate({
    [Segments.PARAMS]: {
      phoneId: Joi.string().required(),
    },
    [Segments.BODY]: {
      phone: Joi.string().required(),
    },
  }),
  phonesController.update,
)

phonesRouter.patch(
  '/main/:phoneId',
  celebrate({
    [Segments.PARAMS]: {
      phoneId: Joi.string().required(),
    },
  }),
  phoneMainController.update,
)

export { phonesRouter }
