import { GetAccountOAuthByProviderAccountIdAndProviderService } from '@modules/_auth/account/services/GetAccountOAuthByProviderAccountIdAndProviderService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class GetAccountOAuthByProviderAccountIdAndProviderController {
  async show(req: Request, res: Response): Promise<Response> {
    try {
      const getAccountOAuthByProviderAccountIdAndProviderService =
        container.resolve(GetAccountOAuthByProviderAccountIdAndProviderService)

      const { providerAccountId, provider } = req.params

      const user =
        await getAccountOAuthByProviderAccountIdAndProviderService.execute({
          providerAccountId,
          provider,
        })

      return res.status(200).json(user)
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}
