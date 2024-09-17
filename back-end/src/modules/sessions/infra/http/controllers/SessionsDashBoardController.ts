import { SessionDashboardService } from '@modules/sessions/services/SessionDashboardService'
import { instanceToPlain } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class SessionsDashBoardController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password, device, company_id, software } = req.body

      const authenticateUser = container.resolve(SessionDashboardService)

      const { user, token, refreshToken } = await authenticateUser.execute({
        email,
        password,
        device,
        company_id,
        software,
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

export { SessionsDashBoardController }
