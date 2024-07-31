import { GetUserByAccountByUserIdAndProviderService } from '@modules/_auth/account/services/GetUserByAccountByUserIdAndProviderService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class GetUserByAccountByUserIdAndProviderController {
  async show(req: Request, res: Response): Promise<Response> {
    try {
      const getUserByAccountByUserIdAndProviderService = container.resolve(
        GetUserByAccountByUserIdAndProviderService,
      )

      const { userId, provider } = req.params

      const user = await getUserByAccountByUserIdAndProviderService.execute({
        userId,
        provider,
      })

      return res.status(200).json(user)
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}
