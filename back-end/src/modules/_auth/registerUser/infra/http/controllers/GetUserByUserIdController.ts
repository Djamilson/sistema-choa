import { GetUserByUserIdService } from '@modules/_auth/registerUser/services/GetUserByUserIdService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class GetUserByUserIdController {
  async show(req: Request, res: Response): Promise<Response> {
    try {
      const getUserByUserIdService = container.resolve(GetUserByUserIdService)

      const { userId } = req.params

      const user = await getUserByUserIdService.execute({
        userId,
      })

      return res.status(200).json(user)
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}
