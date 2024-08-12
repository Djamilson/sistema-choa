import { CreateRefreshTokenDashboardService } from '@modules/refreshesTokens/services/CreateRefreshTokenDashboardService'
import { instanceToPlain } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class RefreshTokenDashboardController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const refreshToken =
        req.body.refreshToken ||
        req.headers['x-access-token'] ||
        req.query.refreshToken

      const { device, software, company_id } = req.query

      const createRefreshToken = container.resolve(
        CreateRefreshTokenDashboardService,
      )

      const newToken = await createRefreshToken.execute({
        refreshToken,
        company_id: String(company_id),
      })

      return res.json(instanceToPlain(newToken))
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}

export { RefreshTokenDashboardController }
