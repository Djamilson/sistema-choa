import { PersonsController } from '@modules/users/infra/http/controllers/PersonsController'
import ProfileController from '@modules/users/infra/http/controllers/ProfileController'
import { ProfilePasswordController } from '@modules/users/infra/http/controllers/ProfilePasswordController'
import { UpdateEmailController } from '@modules/users/infra/http/controllers/UpdateEmailController'
import { UpdateNameEmailController } from '@modules/users/infra/http/controllers/UpdateNameEmailController'
import { UpdateProfileDataController } from '@modules/users/infra/http/controllers/UpdateProfileDataController'
import { ensureAuthenticated } from '@modules/users/infra/http/middleware/ensureAuthenticanted'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { UpdateBirthDateController } from '../controllers/UpdateBirthDateController'
import { UpdateCPFController } from '../controllers/UpdateCPFController'
import { UpdateGenderController } from '../controllers/UpdateGenderController'
import { UpdateNameController } from '../controllers/UpdateNameController'
import { UpdatePromotionalEmailController } from '../controllers/UpdatePromotionalEmailController'

const profileRouter = Router()
const profileController = new ProfileController()
const profilePasswordController = new ProfilePasswordController()
const updateNameEmailController = new UpdateNameEmailController()
const updateNameController = new UpdateNameController()
const updateCPFController = new UpdateCPFController()
const updateBirthDateController = new UpdateBirthDateController()
const updateGenderController = new UpdateGenderController()

const updateProfileDataController = new UpdateProfileDataController()
const updateEmailController = new UpdateEmailController()
const updatePromotionalEmailController = new UpdatePromotionalEmailController()
const personsController = new PersonsController()

profileRouter.use(ensureAuthenticated)

profileRouter.get('/', profileController.show)

profileRouter.get(
  '/:personId',
  celebrate({
    [Segments.PARAMS]: {
      personId: Joi.string().required(),
    },
  }),
  personsController.show,
)

profileRouter.put(
  '/datas',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      cpf: Joi.string().required(),
      birth_date: Joi.string().required(),
    },
  }),
  updateProfileDataController.update,
)

profileRouter.patch(
  '/names',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  updateNameController.update,
)

profileRouter.patch(
  '/cpfs',
  celebrate({
    [Segments.BODY]: {
      cpf: Joi.string().required(),
    },
  }),
  updateCPFController.update,
)
profileRouter.patch(
  '/birth-dates',
  celebrate({
    [Segments.BODY]: {
      birth_date: Joi.string().required(),
    },
  }),
  updateBirthDateController.update,
)

profileRouter.patch(
  '/emails',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  updateEmailController.update,
)

profileRouter.patch(
  '/promotional-emails',
  celebrate({
    [Segments.BODY]: {
      promotional_email: Joi.boolean().required(),
    },
  }),
  updatePromotionalEmailController.update,
)

profileRouter.patch(
  '/genders',
  celebrate({
    [Segments.BODY]: {
      gender: Joi.string().required(),
    },
  }),
  updateGenderController.update,
)

profileRouter.patch(
  '/passwords',
  celebrate({
    [Segments.BODY]: {
      old_password: Joi.string().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profilePasswordController.update,
)

profileRouter.put(
  '/name/email',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  updateNameEmailController.update,
)

export { profileRouter }
