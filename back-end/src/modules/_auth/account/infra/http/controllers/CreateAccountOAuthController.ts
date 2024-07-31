import { CreateAccountOAuthService } from '@modules/_auth/account/services/CreateAccountOAuthService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class CreateAccountOAuthController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const accountOAuthService = container.resolve(CreateAccountOAuthService)

      const {
        user_id,
        type,
        provider,
        provider_account_id,
        refresh_token,
        access_token,
        expires_at,
        token_type,
        scope,
        id_token,
        session_state,
      } = req.body

      const newAccountOAuth = await accountOAuthService.execute({
        user_id,
        type,
        provider,
        provider_account_id,
        refresh_token,
        access_token,
        expires_at,
        token_type,
        scope,
        id_token,
        session_state,
      })

      return res.status(200).json(newAccountOAuth)
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}
