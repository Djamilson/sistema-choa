import { UpdateGenderService } from '@modules/users/services/UpdateGenderService'
import { instanceToPlain } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class UpdateGenderController {
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id

      const { gender } = req.body

      const updateGender = container.resolve(UpdateGenderService)

      const user = await updateGender.execute({
        user_id,
        gender,
      })

      return res.json(instanceToPlain(user))
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}

export { UpdateGenderController }
