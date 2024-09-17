import { CreateVerificationTokenService } from '@modules/_auth/verificationToken/services/CreateVerificationTokenService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class CreateVerificationTokenController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const createVerificationTokenService = container.resolve(
        CreateVerificationTokenService,
      )

      const { token } = req.body

      const newVerificationToken =
        await createVerificationTokenService.execute(token)

      return res.status(200).json(newVerificationToken)
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}
