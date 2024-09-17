import { IPropsUpdateData } from '@modules/__DTOS'
import { Account } from '../../../../../prisma/generated/postgres'

export type IAccountByUserIdAndProvider = {
  userId: string
  provider: string
}

export type IAccountByUserIdAndProviderAccountId = {
  userId: string
  providerAccountId: string
}

export type IGetUserByProviderAccountIdAndProvider = {
  providerAccountId: string
  provider: string
}

export type ICreateAccountDTO = {
  user_id: string
  type: string
  provider: string
  provider_account_id: string
  refresh_token?: string
  access_token?: string
  expires_at?: number
  token_type?: string
  scope?: string
  id_token?: string
  session_state?: string
}

interface IAccountsRepository {
  getAccountByUserIdAndProvider({
    userId,
    provider,
  }: IAccountByUserIdAndProvider): Promise<any>
  getUserByProviderAccountIdAndProvider({
    providerAccountId,
    provider,
  }: IGetUserByProviderAccountIdAndProvider): Promise<any>

  getAccountByProviderAccountIdAndUserId({
    providerAccountId,
    userId,
  }: IAccountByUserIdAndProviderAccountId): Promise<Account | null>
  getAccountByRefreshToken(refreshToken: string): Promise<Account | null>
  create(data: ICreateAccountDTO): Promise<Account>
  update({ id, updateData }: IPropsUpdateData): Promise<Account>
}

export { IAccountsRepository }
