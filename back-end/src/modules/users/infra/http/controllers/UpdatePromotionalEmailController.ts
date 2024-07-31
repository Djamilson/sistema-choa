import { UpdatePromotionalEmailService } from '@modules/users/services/UpdatePromotionalEmailService'
import { instanceToPlain } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class UpdatePromotionalEmailController {
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id

      const { promotional_email } = req.body

      const updatePromotionalEmail = container.resolve(
        UpdatePromotionalEmailService,
      )

      const user = await updatePromotionalEmail.execute({
        user_id,
        promotional_email,
      })

      return res.json(instanceToPlain(user))
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}

export { UpdatePromotionalEmailController }
