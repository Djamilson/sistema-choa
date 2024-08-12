import UpdateProfilePasswordService from '@modules/users/services/UpdateProfilePasswordService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class ProfilePasswordController {
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id
      const { old_password, password } = req.body

      console.log('Password ==>>>>', req.body)

      const updatePasswordProfile = container.resolve(
        UpdateProfilePasswordService,
      )

      const user = await updatePasswordProfile.execute({
        user_id,
        old_password,
        password,
      })

      return res.json(user)
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}

export { ProfilePasswordController }
