import { GetGooglesOAuthByUserIdService } from '@modules/_auth/googleOAuthToken/services/GetGooglesOAuthByUserIdService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class GetGooglesOAuthByUserIdController {
  async show(req: Request, res: Response): Promise<Response> {
    try {
      const getGooglesOAuthByUserIdService = container.resolve(
        GetGooglesOAuthByUserIdService,
      )

      const { userId } = req.params
      const googlesOAuth = await getGooglesOAuthByUserIdService.execute(userId)

      return res.status(200).json(googlesOAuth)
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}
