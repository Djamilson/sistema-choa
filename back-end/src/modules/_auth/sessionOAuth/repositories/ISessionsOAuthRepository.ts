import { Session } from '../../../../../prisma/generated/postgres'

export type ICreateSessionDTO = {
  sessionToken: string
  userId: string
  expires: Date
}

export type IUpdateSession = {
  session_token: string
  updateData: any
}

interface ISessionsOAuthRepository {
  create(data: ICreateSessionDTO): Promise<Session>
  getSessionOAuthAndUserBySessionToken(sessionToken: string): Promise<any>
  update({ session_token, updateData }: IUpdateSession): Promise<Session>
  deleteSession(sessionToken: string): Promise<Session>

  getVerificationTokenOAuthByEmailService(email: string): Promise<any>
}

export { ISessionsOAuthRepository }
