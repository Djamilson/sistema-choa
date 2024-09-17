import { UpdateCollaboratorService } from '@modules/_auth/registerUser/services/UpdateCollaboratorService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class UpdateCollaboretorController {
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const updateCollaboratorService = container.resolve(
        UpdateCollaboratorService,
      )

      const { userId } = req.params
      const { name, email, avatar_url } = req.body

      const updateUser = await updateCollaboratorService.execute({
        userId,
        name,
        email,
        avatar_url,
      })

      return res.status(200).json(updateUser)
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}
