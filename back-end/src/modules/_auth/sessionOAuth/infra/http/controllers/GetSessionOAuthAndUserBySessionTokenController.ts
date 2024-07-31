import { GetSessionOAuthAndUserBySessionTokenService } from '@modules/_auth/sessionOAuth/services/GetSessionOAuthAndUserBySessionTokenService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class GetSessionOAuthAndUserBySessionTokenController {
  async show(req: Request, res: Response): Promise<Response> {
    try {
      const getSessionOAuthAndUserBySessionTokenService = container.resolve(
        GetSessionOAuthAndUserBySessionTokenService,
      )

      const { sessionToken } = req.params

      const sessionOAuthAndUser =
        await getSessionOAuthAndUserBySessionTokenService.execute({
          sessionToken,
        })

      return res.status(200).json(sessionOAuthAndUser)
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}
