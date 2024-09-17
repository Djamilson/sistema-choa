import { CreateCollaboratorService } from '@modules/_auth/registerUser/services/CreateCollaboratorService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class CreateCollaboretorController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const createCollaboratorService = container.resolve(
        CreateCollaboratorService,
      )

      const { name, email, phone, password, birth_date, cpf } = req.body

      const newCollaborator = await createCollaboratorService.execute({
        name,
        email,
        phone,
        password,
        birth_date,
        cpf,
      })

      return res.status(200).json(newCollaborator)
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}
