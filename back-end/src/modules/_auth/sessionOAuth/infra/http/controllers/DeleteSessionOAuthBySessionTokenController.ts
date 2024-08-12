import { DeleteSessionOAuthBySessionTokenService } from '@modules/_auth/sessionOAuth/services/DeleteSessionOAuthBySessionTokenService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class DeleteSessionOAuthBySessionTokenController {
  async destroy(req: Request, res: Response): Promise<Response> {
    try {
      const deleteSessionOAuthBySessionTokenService = container.resolve(
        DeleteSessionOAuthBySessionTokenService,
      )

      const { sessionToken } = req.params

      await deleteSessionOAuthBySessionTokenService.execute({
        sessionToken,
      })

      return res.status(202).json()
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}
