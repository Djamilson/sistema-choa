import { UpdateBirthDateService } from '@modules/users/services/UpdateBirthDateService'
import { instanceToPlain } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class UpdateBirthDateController {
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id

      const { birth_date } = req.body

      const updateBirthDate = container.resolve(UpdateBirthDateService)

      const user = await updateBirthDate.execute({
        user_id,
        birth_date,
      })

      return res.json(instanceToPlain(user))
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}

export { UpdateBirthDateController }
