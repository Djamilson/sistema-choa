import {
  ICreateSessionDTO,
  ISessionsOAuthRepository,
  IUpdateSession,
} from '@modules/_auth/sessionOAuth/repositories/ISessionsOAuthRepository'
import { postgres } from '@shared/infra/prisma/lib/prismaClient'
import { Session } from '../../../../../../../prisma/generated/postgres'

class SessionsOAuthRepository implements ISessionsOAuthRepository {
  private prismaRepository = postgres

  constructor() {
    this.prismaRepository
  }

  public async getSessionOAuthAndUserBySessionToken(
    sessionToken: string,
  ): Promise<any> {
    const session = await this.prismaRepository.session.findUnique({
      where: { session_token: sessionToken },
      select: {
        user: {
          select: {
            id: true,
            person_id: true,
            is_verified: true,
            person: {
              select: {
                id: true,
                email: true,
                name: true,
                birth_date: true,
                cpf: true,
                avatar: true,
              },
            },
          },
        },
        created_at: true,
        expires: true,
        session_token: true,
        updated_at: true,
        user_id: true,
      },
    })
    return session
  }

  public async create({
    expires,
    sessionToken,
    userId,
  }: ICreateSessionDTO): Promise<Session> {
    return this.prismaRepository.session.create({
      data: {
        expires,
        session_token: sessionToken,
        user_id: userId,
      },
    })
  }

  public async update({
    session_token,
    updateData,
  }: IUpdateSession): Promise<Session> {
    const session = await this.prismaRepository.session.update({
      where: {
        session_token,
      },
      data: updateData,
      select: {
        created_at: true,
        expires: true,
        session_token: true,
        updated_at: true,
        user_id: true,
      },
    })
    return session
  }

  public async deleteSession(sessionToken: string): Promise<Session> {
    return this.prismaRepository.session.delete({
      where: {
        session_token: sessionToken,
      },
    })
  }

  public async getVerificationTokenOAuthByEmailService(
    email: string,
  ): Promise<any> {
    const verificationToken =
      await this.prismaRepository.verificationToken.findFirst({
        where: { email },
        select: {
          email: true,
          id: true,
          expires: true,
          token: true,
        },
      })
    return verificationToken
  }
}

export default SessionsOAuthRepository
