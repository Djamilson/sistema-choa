import { VerificationToken } from '../../../../../prisma/generated/postgres'

export type ICreateVerificationTokenDTO = {
  email: string
  token: string
  expires: Date
}

interface IVerificationTokensRepository {
  getVerificationTokenByToken(token: string): Promise<VerificationToken | null>
  create(data: ICreateVerificationTokenDTO): Promise<VerificationToken>
}

export { IVerificationTokensRepository }
