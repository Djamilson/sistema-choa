import { IPropsUpdateData } from '@modules/__DTOS'
import {
  IAccountByUserIdAndProvider,
  IAccountByUserIdAndProviderAccountId,
  IAccountsRepository,
  ICreateAccountDTO,
  IGetUserByProviderAccountIdAndProvider,
} from '@modules/_auth/account/repositories/IAccountsRepository'
import { postgres } from '@shared/infra/prisma/lib/prismaClient'
import { Account } from '../../../../../../../prisma/generated/postgres'

class AccountsRepository implements IAccountsRepository {
  private prismaRepository = postgres

  constructor() {
    this.prismaRepository
  }

  public async getAccountByUserIdAndProvider({
    userId,
    provider,
  }: IAccountByUserIdAndProvider): Promise<Account> {
    const account = await this.prismaRepository.account.findFirst({
      where: { user_id: userId, provider },
      select: {
        access_token: true,
        expires_at: true,
        id: true,
        id_token: true,
        provider: true,
        provider_account_id: true,
        refresh_token: true,
        scope: true,
        session_state: true,
        token_type: true,
        type: true,
        user: {
          select: {
            id: true,
            person: {
              select: {
                id: true,
                birth_date: true,
                avatar: true,
                email: true,
                cpf: true,
                name: true,
                privacy: true,
                promotional_email: true,
                gender: true,
                rg: true,
                status: true,
                rgss: true,
              },
            },
          },
        },
        user_id: true,
      },
    })

    return account as unknown as Account
  }

  public async getAccountByProviderAccountIdAndUserId({
    providerAccountId,
    userId,
  }: IAccountByUserIdAndProviderAccountId): Promise<Account | null> {
    const account = await this.prismaRepository.account.findFirst({
      where: { user_id: userId, provider_account_id: providerAccountId },
      select: {
        access_token: true,
        expires_at: true,
        id: true,
        id_token: true,
        provider: true,
        provider_account_id: true,
        refresh_token: true,
        scope: true,
        session_state: true,
        token_type: true,
        type: true,
        user: {
          select: {
            id: true,
            person: {
              select: {
                id: true,
                birth_date: true,
                avatar: true,
                email: true,
                cpf: true,
                name: true,
                privacy: true,
                promotional_email: true,
                gender: true,
                rg: true,
                status: true,
                rgss: true,
              },
            },
          },
        },
        user_id: true,
      },
    })

    return account as unknown as Account
  }

  public async getUserByProviderAccountIdAndProvider({
    providerAccountId,
    provider,
  }: IGetUserByProviderAccountIdAndProvider): Promise<any> {
    const account = await this.prismaRepository.account.findUnique({
      where: {
        provider_provider_account_id: {
          provider,
          provider_account_id: providerAccountId,
        },
      },
      select: {
        access_token: true,
        expires_at: true,
        id: true,
        id_token: true,
        provider: true,
        provider_account_id: true,
        refresh_token: true,
        scope: true,
        session_state: true,
        token_type: true,
        type: true,
        user: {
          select: {
            id: true,
            person: {
              select: {
                id: true,
                birth_date: true,
                avatar: true,
                email: true,
                cpf: true,
                name: true,
                privacy: true,
                promotional_email: true,
                gender: true,
                rg: true,
                status: true,
                rgss: true,
              },
            },
          },
        },
        user_id: true,
      },
    })
    return account
  }

  public async getAccountByRefreshToken(
    refreshToken: string,
  ): Promise<Account | null> {
    console.log('refreshToken', refreshToken)
    const account = await this.prismaRepository.account.findFirst({
      where: {
        refresh_token: refreshToken,
      },
      select: {
        access_token: true,
        expires_at: true,
        id: true,
        id_token: true,
        provider: true,
        provider_account_id: true,
        refresh_token: true,
        scope: true,
        session_state: true,
        token_type: true,
        type: true,
        user: {
          select: {
            id: true,
            person: {
              select: {
                id: true,
                birth_date: true,
                avatar: true,
                email: true,
                cpf: true,
                name: true,
                privacy: true,
                promotional_email: true,
                gender: true,
                rg: true,
                status: true,
                rgss: true,
              },
            },
          },
        },
        user_id: true,
      },
    })
    return account
  }

  public async create(data: ICreateAccountDTO): Promise<Account> {
    return this.prismaRepository.account.create({
      data,
      select: {
        access_token: true,
        expires_at: true,
        id: true,
        id_token: true,
        provider: true,
        provider_account_id: true,
        refresh_token: true,
        scope: true,
        session_state: true,
        token_type: true,
        type: true,
        user: {
          select: {
            id: true,
            person: {
              select: {
                id: true,
                birth_date: true,
                avatar: true,
                email: true,
                cpf: true,
                name: true,
                privacy: true,
                promotional_email: true,
                gender: true,
                rg: true,
                status: true,
                rgss: true,
              },
            },
          },
        },
        user_id: true,
      },
    })
  }

  public async update({ id, updateData }: IPropsUpdateData): Promise<Account> {
    const account = await this.prismaRepository.account.update({
      where: {
        id: String(id),
      },
      data: updateData,
      select: {
        access_token: true,
        expires_at: true,
        id: true,
        id_token: true,
        provider: true,
        provider_account_id: true,
        refresh_token: true,
        scope: true,
        session_state: true,
        token_type: true,
        type: true,
        user_id: true,
        user: {
          select: {
            id: true,
            person: {
              select: {
                id: true,
                birth_date: true,
                avatar: true,
                email: true,
                cpf: true,
                name: true,
                privacy: true,
                promotional_email: true,
                gender: true,
                rg: true,
                status: true,
                rgss: true,
              },
            },
          },
        },
      },
    })
    return account
  }
}

export default AccountsRepository
