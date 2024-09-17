import { GetVerficationTokenOAuthByEmailService } from '@modules/_auth/sessionOAuth/services/GetVerficationTokenOAuthByEmailService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class GetVerficationTokenOAuthByEmailController {
  async show(req: Request, res: Response): Promise<Response> {
    try {
      const getVerficationTokenOAuthByEmailService = container.resolve(
        GetVerficationTokenOAuthByEmailService,
      )

      const { email } = req.params

      const verficationTokenOAuth =
        await getVerficationTokenOAuthByEmailService.execute({
          email,
        })

      return res.status(200).json(verficationTokenOAuth)
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}
