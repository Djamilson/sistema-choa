import { GetUserByUserIdColaboratorLoggedService } from '@modules/users/services/GetUserByUserIdColaboratorLoggedService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class GetUserByUserIdColaboratorLoggedController {
  public async show(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params

      const getUserByUserIdColaboratorLoggedService = container.resolve(
        GetUserByUserIdColaboratorLoggedService,
      )

      const user = await getUserByUserIdColaboratorLoggedService.execute({
        user_id: userId,
      })

      return res.status(200).json(user)
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}

export { GetUserByUserIdColaboratorLoggedController }
