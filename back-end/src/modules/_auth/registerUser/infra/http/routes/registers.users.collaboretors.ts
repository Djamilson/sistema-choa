import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import CreateCollaboretorController from '../controllers/CreateCollaboretorController'
import GetUserByEmailAndCpfOrCnpjController from '../controllers/GetUserByEmailAndCpfOrCnpjController'
import GetUserByEmailController from '../controllers/GetUserByEmailController'
import GetUserByUserIdController from '../controllers/GetUserByUserIdController'
import SignUpCodeValidationsByCodeController from '../controllers/SignUpCodeValidationsByCodeController'
import UpdateCollaboretorController from '../controllers/UpdateCollaboretorController'

const registersRouter = Router()

const getUserByEmailAndCpfOrCnpjController =
  new GetUserByEmailAndCpfOrCnpjController()
const getUserByEmailController = new GetUserByEmailController()
const signUpCodeValidationsByCodeController =
  new SignUpCodeValidationsByCodeController()
const createCollaboretorController = new CreateCollaboretorController()
const updateCollaboretorController = new UpdateCollaboretorController()

const getUserByUserIdController = new GetUserByUserIdController()
// not logged

registersRouter.patch(
  '/collaborators/users/update/:userId',
  celebrate({
    [Segments.PARAMS]: {
      userId: Joi.string().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      avatar_url: Joi.string().required(),
    },
  }),
  updateCollaboretorController.update,
)

registersRouter.post(
  '/collaborators',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      password: Joi.string().required(),
      birth_date: Joi.string().required(),
      cpf: Joi.string().required(),
    },
  }),
  createCollaboretorController.create,
)

registersRouter.get(
  '/collaborators',
  celebrate({
    [Segments.QUERY]: {
      email: Joi.string().required(),
      cpfOrCnpj: Joi.string().required(),
    },
  }),
  getUserByEmailAndCpfOrCnpjController.show,
)

registersRouter.get(
  '/collaborators/emails/:email',
  celebrate({
    [Segments.PARAMS]: {
      email: Joi.string().required(),
    },
  }),
  getUserByEmailController.show,
)

registersRouter.get(
  '/collaborators/ids/:userId',
  celebrate({
    [Segments.PARAMS]: {
      userId: Joi.string().required(),
    },
  }),
  getUserByUserIdController.show,
)

registersRouter.get(
  '/collaborators/sign-up-code-validations',
  celebrate({
    [Segments.QUERY]: {
      code_validation: Joi.string().required(),
    },
  }),
  signUpCodeValidationsByCodeController.show,
)

export default registersRouter
