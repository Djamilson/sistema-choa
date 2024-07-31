import { GetGooglesOAuthByEmailService } from '@modules/_auth/googleOAuthToken/services/GetGooglesOAuthByEmailService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class GetGooglesOAuthByEmailController {
  async show(req: Request, res: Response): Promise<Response> {
    try {
      const getGooglesOAuthByEmailService = container.resolve(
        GetGooglesOAuthByEmailService,
      )
      const { email } = req.params

      console.log('emailll', req.params)

      const { provider_account_id, type } = req.body

      const googlesOAuth = await getGooglesOAuthByEmailService.execute({
        email,
        providerAccountId: provider_account_id,
        type,
      })

      return res.status(200).json(googlesOAuth)
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}
