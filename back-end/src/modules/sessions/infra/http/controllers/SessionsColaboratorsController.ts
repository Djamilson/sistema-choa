import { SessionCollaboratorService } from '@modules/sessions/services/SessionCollaboratorService'
import { instanceToPlain } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class SessionsColaboratorsController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body

      const sessionCollaboratorService = container.resolve(
        SessionCollaboratorService,
      )

      const { user, token, refreshToken } =
        await sessionCollaboratorService.execute({
          email,
          password,
        })

      return res.json({
        user: instanceToPlain(user),
        token,
        refreshToken,
      })
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}

export { SessionsColaboratorsController }
