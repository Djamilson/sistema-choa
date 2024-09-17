import { GetUserByEmailAndCpfOrCnpjService } from '@modules/_auth/registerUser/services/GetUserByEmailAndCpfOrCnpjService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class GetUserByEmailAndCpfOrCnpjController {
  async show(req: Request, res: Response): Promise<Response> {
    try {
      const getUserByEmailAndCpfOrCnpjService = container.resolve(
        GetUserByEmailAndCpfOrCnpjService,
      )

      const { email, cpfOrCnpj } = req.query

      const queryEmail = `${email || ''}` // string de consulta
      const queryCpfOrCnpj = `${cpfOrCnpj || ''}` // string de consulta

      await getUserByEmailAndCpfOrCnpjService.execute({
        email: queryEmail,
        cpfOrCnpj: queryCpfOrCnpj,
      })

      return res.status(200).json({ succss: 'ok' })
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}
