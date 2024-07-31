import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import CreateVerificationTokenController from '../controllers/CreateVerificationTokenController'

const oauthVerificationTikensRouter = Router()

const createVerificationTokenController =
  new CreateVerificationTokenController()

oauthVerificationTikensRouter.post(
  '/news',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().required(),
    },
  }),
  createVerificationTokenController.create,
)

export default oauthVerificationTikensRouter
