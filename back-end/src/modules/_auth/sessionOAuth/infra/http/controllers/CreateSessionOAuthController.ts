import { CreateSessionOAuthService } from '@modules/_auth/sessionOAuth/services/CreateSessionOAuthService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class CreateSessionOAuthController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const sessionOAuthService = container.resolve(CreateSessionOAuthService)

      const { sessionToken, userId, expires } = req.body

      const newSessionOAuth = await sessionOAuthService.execute({
        sessionToken,
        userId,
        expires,
      })

      return res.status(200).json(newSessionOAuth)
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}
