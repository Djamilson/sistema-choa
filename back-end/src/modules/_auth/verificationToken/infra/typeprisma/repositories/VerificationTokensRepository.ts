import { postgres } from '@shared/infra/prisma/lib/prismaClient'
import {
  ICreateVerificationTokenDTO,
  IVerificationTokensRepository,
} from '../../../repositories/IVerificationTokensRepository'
import { VerificationToken } from './../../../../../../../prisma/generated/postgres/index.d'

class VerificationTokensRepository implements IVerificationTokensRepository {
  private prismaRepository = postgres

  constructor() {
    this.prismaRepository
  }

  public async getVerificationTokenByToken(
    token: string,
  ): Promise<VerificationToken | null> {
    const verificationToken =
      await this.prismaRepository.verificationToken.findFirst({
        where: { token },
        select: {
          expires: true,
          id: true,
          token: true,
          email: true,
        },
      })
    return verificationToken
  }

  public async create(
    data: ICreateVerificationTokenDTO,
  ): Promise<VerificationToken> {
    return this.prismaRepository.verificationToken.create({
      data,
      select: {
        id: true,
        email: true,
        expires: true,
        token: true,
      },
    })
  }
}

export default VerificationTokensRepository
