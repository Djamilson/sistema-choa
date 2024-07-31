import { GetUserByEmailService } from '@modules/users/services/GetUserByEmailService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class GetUserByEmailController {
  async show(req: Request, res: Response): Promise<Response> {
    try {
      const getUserByEmailService = container.resolve(GetUserByEmailService)

      const { email } = req.params

      const user = await getUserByEmailService.execute({
        email,
      })

      return res.status(200).json(user)
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}
