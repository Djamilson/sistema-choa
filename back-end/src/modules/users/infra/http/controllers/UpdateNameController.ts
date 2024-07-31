import { UpdateNameService } from '@modules/users/services/UpdateNameService'
import { instanceToPlain } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class UpdateNameController {
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id

      const { name } = req.body

      const updateName = container.resolve(UpdateNameService)

      const user = await updateName.execute({
        user_id,
        name,
      })

      return res.json(instanceToPlain(user))
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}

export { UpdateNameController }
