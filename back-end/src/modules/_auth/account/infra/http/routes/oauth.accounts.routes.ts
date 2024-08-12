import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import CreateAccountOAuthController from '../controllers/CreateAccountOAuthController'
import GetAccountOAuthByProviderAccountIdAndProviderController from '../controllers/GetAccountOAuthByProviderAccountIdAndProviderController'
import GetUserByAccountByUserIdAndProviderController from '../controllers/GetUserByAccountByUserIdAndProviderController'

const oauthAccountsRouter = Router()

const createAccountOAuthController = new CreateAccountOAuthController()
const getAccountOAuthByProviderAccountIdAndProviderController =
  new GetAccountOAuthByProviderAccountIdAndProviderController()
const getUserByAccountByUserIdAndProviderController =
  new GetUserByAccountByUserIdAndProviderController()

oauthAccountsRouter.get(
  '/:providerAccountId/:provider',
  celebrate({
    [Segments.PARAMS]: {
      providerAccountId: Joi.string().required(),
      provider: Joi.string().required(),
    },
  }),
  getAccountOAuthByProviderAccountIdAndProviderController.show,
)

oauthAccountsRouter.get(
  '/test/:userId/:provider',
  celebrate({
    [Segments.PARAMS]: {
      userId: Joi.string().required(),
      provider: Joi.string().required(),
    },
  }),
  getUserByAccountByUserIdAndProviderController.show,
)

oauthAccountsRouter.post(
  '/news',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().required(),
      type: Joi.string().required(),
      provider: Joi.string().required(),
      provider_account_id: Joi.string().required(),

      refresh_token: Joi.string().optional().allow(''),
      access_token: Joi.string().optional().allow(''),
      expires_at: Joi.number().optional().allow(''),
      token_type: Joi.string().optional().allow(''),
      scope: Joi.string().optional().allow(''),
      id_token: Joi.string().optional().allow(''),
      session_state: Joi.string().optional().allow(''),
    },
  }),
  createAccountOAuthController.create,
)

export default oauthAccountsRouter
