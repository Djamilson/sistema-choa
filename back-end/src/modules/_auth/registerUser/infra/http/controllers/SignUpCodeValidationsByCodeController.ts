import { SignUpCodeValidationsByCodeService } from '@modules/_auth/registerUser/services/SignUpCodeValidationsByCodeService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class SignUpCodeValidationsByCodeController {
  async show(req: Request, res: Response): Promise<Response> {
    try {
      const signUpCodeValidationsByCodeService = container.resolve(
        SignUpCodeValidationsByCodeService,
      )

      const { code_validation } = req.query

      const queryCodeValidation = `${code_validation || ''}` // string de consulta

      const signUpCodeValidation =
        await signUpCodeValidationsByCodeService.execute({
          code_validation: queryCodeValidation,
        })

      return res.status(200).json(signUpCodeValidation)
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}
