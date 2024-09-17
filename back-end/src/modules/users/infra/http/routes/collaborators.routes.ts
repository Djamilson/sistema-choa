import { CollaboratorsPaginationByCpfOrNameController } from '@modules/users/infra/http/controllers/CollaboratorsPaginationByCpfOrNameController'
import { CreateCollaboratorsController } from '@modules/users/infra/http/controllers/CreateCollaboratorsController'
import { ensureAuthenticated } from '@modules/users/infra/http/middleware/ensureAuthenticanted'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'

const collaboratorsRouter = Router()

const collaboratorsPaginationByCpfOrNameController =
  new CollaboratorsPaginationByCpfOrNameController()

const createCollaboratorsController = new CreateCollaboratorsController()
// not logged in user

// logged
collaboratorsRouter.use(ensureAuthenticated)

collaboratorsRouter.get(
  '/pagination/list',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.string().required(),
      limit: Joi.string().required(),
      q: Joi.string().optional().allow(''),
      labelSearch: Joi.string().required(),
    },
  }),
  collaboratorsPaginationByCpfOrNameController.index,
)

collaboratorsRouter.post(
  '/accounts/:companyId',
  celebrate({
    [Segments.PARAMS]: {
      companyId: Joi.string().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      password: Joi.string().required(),
      birth_date: Joi.string().required(),
      cpf: Joi.string().required(),
      nameGroup: Joi.string().required(),
      zip_code: Joi.string().required(),
      street: Joi.string().required(),
      number: Joi.number().required(),
      complement: Joi.string().optional().allow(''),
      neighborhood: Joi.string().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
    },
  }),
  createCollaboratorsController.create,
)

export { collaboratorsRouter }
