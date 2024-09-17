import { CreateRefreshTokenCollaboratorsService } from '@modules/refreshesTokens/services/CreateRefreshTokenCollaboratorsService'
import { instanceToPlain } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class RefreshTokenCollaboratorsController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const refreshToken =
        req.body.refreshToken ||
        req.headers['x-access-token'] ||
        req.query.refreshToken

      const createRefreshToken = container.resolve(
        CreateRefreshTokenCollaboratorsService,
      )

      const newToken = await createRefreshToken.execute({
        refreshToken,
      })

      return res.json(instanceToPlain(newToken))
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}

export { RefreshTokenCollaboratorsController }
