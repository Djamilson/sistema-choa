import { UpdateCPFService } from '@modules/users/services/UpdateCPFService'
import { instanceToPlain } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class UpdateCPFController {
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id

      const { cpf } = req.body

      const updateCPF = container.resolve(UpdateCPFService)

      const user = await updateCPF.execute({
        user_id,
        cpf,
      })

      return res.json(instanceToPlain(user))
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}

export { UpdateCPFController }
