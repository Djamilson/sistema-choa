import { UpdateSessionOAuthBySessionTokenService } from '@modules/_auth/sessionOAuth/services/UpdateSessionOAuthBySessionTokenService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class UpdateSessionOAuthBySessionTokenController {
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const updateSessionOAuthBySessionTokenService = container.resolve(
        UpdateSessionOAuthBySessionTokenService,
      )

      const { sessionToken } = req.params
      const { userId, expires } = req.body

      const updateSessionOAuth =
        await updateSessionOAuthBySessionTokenService.execute({
          sessionToken,
          userId,
          expires,
        })

      return res.status(200).json(updateSessionOAuth)
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}
