import { IDataPageDTO, IPropsUpdateData } from '@modules/__DTOS'
import {
  ICreatePersonAndPhoneAndAddressDTO,
  ICreateUserCollaborationDTO,
  ICreateUserCollaborationDashboardDTO,
  ICreateUserDTO,
  IUserIdOnCompanyId,
} from '@modules/users/dtos/ICreateDTO'
import { ITotalUsersDTO } from '@modules/users/dtos/ITotalUsersDTO'
import IUsersRepository, {
  IDataPageCollaboratorsDTO,
} from '@modules/users/repositories/IUsersRepository'
import { IUserId } from '@modules/users/services/ListUsersByUserIdAndProductIdReviewsService'
import AppError from '@shared/errors/AppError'
import { postgres } from '@shared/infra/prisma/lib/prismaClient'
import User from '../entities/User'

class UsersRepository implements IUsersRepository {
  private prismaRepository = postgres

  constructor() {
    this.prismaRepository
  }

  public async findByCPF(cpf: string): Promise<User | null> {
    const meUser = this.prismaRepository.user.findFirst({
      where: { person: { cpf } },
      include: {
        person: {
          select: {
            id: true,
            name: true,
            email: true,
            cpf: true,
            status: true,
            privacy: true,
            avatar: true,
          },
        },
        users_companies_groups: {
          select: {
            group: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
          },
        },
      },
    })
    return meUser as unknown as User
  }

  public async findByName(name: string): Promise<User | null> {
    const meUser = await this.prismaRepository.user.findFirst({
      where: { person: { name: { equals: name, mode: 'insensitive' } } },
      include: {
        person: {
          select: {
            id: true,
            name: true,
            email: true,
            status: true,
            gender: true,
            promotional_email: true,
            privacy: true,
            avatar: true,
          },
        },
        users_companies_groups: {
          select: {
            group: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
          },
        },
      },
    })
    return meUser as unknown as User
  }

  public async findByIdNotPassword(id: string): Promise<any> {
    return this.prismaRepository.user.findUnique({
      where: { id },
      select: {
        id: true,
        person: {
          select: {
            id: true,
            name: true,
            email: true,
            status: true,
            gender: true,
            promotional_email: true,
            cpf: true,
            birth_date: true,
            privacy: true,
            avatar: true,
          },
        },
      },
    })
  }

  public async findByIdAllData(id: string): Promise<any> {
    return this.prismaRepository.user.findUnique({
      where: { id },
      select: {
        id: true,
        person: {
          select: {
            id: true,
            name: true,
            email: true,
            status: true,
            privacy: true,
            gender: true,
            promotional_email: true,
            avatar: true,
            cpf: true,
            rg: true,
            birth_date: true,
            phone: { select: { id: true, person_id: true, phone: true } },
          },
        },
      },
    })
  }

  public async getUserByUserIdAndCompanyIdDashboardLogged({
    user_id,
    company_id,
  }: IUserIdOnCompanyId): Promise<any> {
    return this.prismaRepository.user.findUnique({
      where: { id: user_id },
      include: {
        person: {
          select: {
            id: true,
            name: true,
            email: true,
            status: true,
            gender: true,
            privacy: true,
            promotional_email: true,
            avatar: true,
          },
        },

        users_companies_groups: {
          where: {
            status: true,
            company_id,
          },
          select: {
            group: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
          },
        },
      },
    })
  }

  public async getUserByUserIdColaboratorLogged(id: string): Promise<any> {
    return this.prismaRepository.user.findUnique({
      where: { id },
      include: {
        person: {
          select: {
            id: true,
            name: true,
            email: true,
            status: true,
            privacy: true,
            gender: true,
            promotional_email: true,
            avatar: true,
            cpf: true,
            rg: true,
            birth_date: true,
            phone: { select: { id: true, person_id: true, phone: true } },
          },
        },

        users_companies_groups: {
          select: {
            status: true,
            company_id: true,
            group: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
          },
        },
      },
    })
  }

  public async findById(id: string): Promise<any> {
    try {
      return this.prismaRepository.user.findUnique({
        where: { id },
        include: {
          person: {
            select: {
              id: true,
              name: true,
              email: true,
              status: true,
              privacy: true,
              avatar: true,
              cpf: true,
              rg: true,
              gender: true,
              promotional_email: true,
              birth_date: true,
              phone: { select: { id: true, person_id: true, phone: true } },
            },
          },

          users_companies_groups: {
            select: {
              status: true,
              company_id: true,
              group: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                },
              },
            },
          },
        },
      })
    } catch (e) {
      console.log('Me erro:', e)

      return e
    }
  }

  public async findByIdInfoPerson(user_id: string): Promise<any | null> {
    const user = await this.prismaRepository.user.findUnique({
      where: { id: user_id },

      include: {
        person: {
          select: {
            id: true,
            name: true,
            email: true,
            status: true,
            privacy: true,
            avatar: true,
            birth_date: true,
            gender: true,
            promotional_email: true,
            cpf: true,
          },
        },
      },
    })

    return user
  }

  public async listUsersByUserIdAndProductIdReviews(
    listUserIds: IUserId[],
  ): Promise<any> {
    const userIds = listUserIds.map((item) => item.id)

    const users = await this.prismaRepository.user.findMany({
      where: {
        id: { in: userIds },
      },

      select: {
        id: true,
        person: {
          select: {
            id: true,
            name: true,
            avatar: true,
            promotional_email: true,
          },
        },
      },
    })

    return users
  }

  public async findByIdInfoUser(user_id: string): Promise<User> {
    const user = await this.prismaRepository.user.findUnique({
      where: { id: user_id },

      include: {
        person: {
          select: {
            id: true,
            name: true,
            email: true,
            status: true,
            cpf: true,
            privacy: true,
            gender: true,
            promotional_email: true,
            avatar: true,
          },
        },
        users_companies_groups: {
          select: {
            group: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
          },
        },
      },
    })

    return user as unknown as User
  }

  public async findByEmail(email: string): Promise<User> {
    console.log('estoubuscaondo por email', email)
    const user = await this.prismaRepository.user.findFirst({
      where: { person: { email: { equals: email } } },
      include: {
        person: {
          select: {
            id: true,
            name: true,
            email: true,
            status: true,
            cpf: true,
            birth_date: true,
            gender: true,
            promotional_email: true,
            privacy: true,
            avatar: true,
          },
        },

        users_companies_groups: {
          where: {
            status: true,
          },
          select: {
            status: true,
            company_id: true,
            group: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
          },
        },
      },
    })

    console.log('buscquei por email my user', user)

    return user as unknown as User
  }

  public async allUsers(): Promise<any> {
    return this.prismaRepository.user.findMany({})
  }

  public async createCollaboratorDashBoard(
    data: ICreateUserCollaborationDashboardDTO,
  ): Promise<any> {
    try {
      const { person, password, group } = data

      const meUser = await this.prismaRepository.user.create({
        data: {
          password,
          person: {
            create: {
              name: person.name,
              email: person.email,
              cpf: person.cpf,
              birth_date: person.birth_date,
            },
          },
          users_companies_groups: {
            createMany: {
              data: group,
            },
          },
        },

        select: {
          id: true,
          password: true,
          is_verified: true,

          person: {
            select: {
              id: true,
              name: true,
              email: true,
              gender: true,
              promotional_email: true,
            },
          },
          users_companies_groups: {
            where: {
              status: true,
            },
            select: {
              status: true,
              company_id: true,
              group: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                },
              },
            },
          },
        },
      })

      return meUser as unknown as User
    } catch (erro) {
      console.log('erro', erro)
      throw new AppError(erro, 401)
    }
  }

  public async createCollaborator(
    data: ICreateUserCollaborationDTO,
  ): Promise<any> {
    try {
      const { person, password, phone } = data

      await this.prismaRepository.$transaction(async (trx) => {
        const meUser = await trx.user.create({
          data: {
            password,
            person: {
              create: person,
            },
          },

          select: {
            id: true,
            password: true,
            is_verified: true,

            person: {
              select: {
                id: true,
                name: true,
                email: true,
                gender: true,
                promotional_email: true,
              },
            },
            users_companies_groups: {
              where: {
                status: true,
              },
              select: {
                status: true,
                company_id: true,
                group: {
                  select: {
                    id: true,
                    name: true,
                    description: true,
                  },
                },
              },
            },
          },
        })

        await trx.receiver.create({
          data: {
            name: person.name,
            cpf: person.cpf,
            email: person.email,
            phone,
            user_id: meUser.id,
          },
        })

        return meUser as unknown as User
      })
    } catch (erro) {
      throw new AppError(erro)
    }
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    try {
      const { person, password, groups } = data

      console.log('vou criar', JSON.stringify(data, null, 2))

      const meUser = await this.prismaRepository.user.create({
        data: {
          password,
          person: {
            create: person,
          },
          users_companies_groups: {
            createMany: {
              data: groups,
            },
          },
        },

        select: {
          id: true,
          person: {
            select: {
              name: true,
              email: true,
              gender: true,
              promotional_email: true,
            },
          },
          users_companies_groups: {
            where: {
              status: true,
            },
            select: {
              status: true,
              company_id: true,
              group: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                },
              },
            },
          },
        },
      })

      return meUser as unknown as User
    } catch (erro) {
      console.log('erro', erro)
      return {} as User
    }
  }

  public async createPersonAndPhoneAndAddresss({
    user,
    address,
  }: ICreatePersonAndPhoneAndAddressDTO): Promise<any> {
    return await this.prismaRepository.$transaction(async (): Promise<any> => {
      const { person, password } = user

      const meUser = await this.prismaRepository.user.create({
        data: {
          password,
          person: {
            create: person,
          },
        },
        select: {
          id: true,
          person: {
            select: {
              id: true,
              name: true,
              email: true,
              gender: true,
              promotional_email: true,
            },
          },
          users_companies_groups: {
            where: {
              status: true,
            },
            select: {
              status: true,
              company_id: true,
              group: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                },
              },
            },
          },
        },
      })

      const newAddress = await this.prismaRepository.addressReceiver.create({
        data: {
          ...address,
        },
      })

      return {
        user: meUser,
        address: newAddress,
      }
    })
  }

  public async update({ id, updateData }: IPropsUpdateData): Promise<User> {
    const user = await this.prismaRepository.user.update({
      where: {
        id: String(id),
      },
      data: updateData,
    })
    return user as unknown as User
  }

  public async findCollaboratorsPaginationByCpfOrName(
    data: IDataPageCollaboratorsDTO,
  ): Promise<ITotalUsersDTO> {
    const { page, pageSize, query, labelSearch } = data

    let users = [] as any[]

    console.log('=>>>', data)

    const total =
      labelSearch === 'cpf'
        ? await this.totalRegisterBySearchCpf(data)
        : await this.totalRegister(data)

    if (total > 0) {
      users =
        labelSearch === 'cpf'
          ? await this.prismaRepository.user.findMany({
              skip: (page - 1) * pageSize,
              take: pageSize,
              where: {
                person: {
                  cpf: {
                    contains: query /* Optional filter */,
                    mode: 'insensitive',
                  },
                },
              },
              select: {
                id: true,
                person: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                    gender: true,
                    promotional_email: true,
                    cpf: true,
                    created_at: true,
                  },
                },
              },
              orderBy: {
                person: {
                  name: 'asc',
                },
              },
            })
          : await this.prismaRepository.user.findMany({
              skip: (page - 1) * pageSize,
              take: pageSize,
              where: {
                person: {
                  name: {
                    contains: query /* Optional filter */,
                    mode: 'insensitive',
                  },
                },
              },
              select: {
                id: true,
                person: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                    cpf: true,
                    gender: true,
                    promotional_email: true,
                    created_at: true,
                  },
                },
              },
              orderBy: {
                person: {
                  name: 'asc',
                },
              },
            })
    }

    return {
      result: users,
      total,
    }
  }

  public async totalRegisterBySearchCpf(data: IDataPageDTO): Promise<number> {
    const { query } = data
    return this.prismaRepository.user.count({
      where: {
        person: {
          cpf: {
            contains: query /* Optional filter */,
            mode: 'insensitive',
          },
        },
      },
    })
  }

  public async totalRegister(data: IDataPageDTO): Promise<number> {
    const { query } = data
    return this.prismaRepository.user.count({
      where: {
        person: {
          name: {
            contains: query /* Optional filter */,
            mode: 'insensitive',
          },
        },
      },
    })
  }

  public async allUsersPagination(data: IDataPageDTO): Promise<ITotalUsersDTO> {
    const { page, pageSize, query } = data

    let users = [] as any[]

    console.log('=>>>', data)

    const total = await this.totalRegister(data)

    if (total > 0) {
      users = await this.prismaRepository.user.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        where: {
          person: {
            name: {
              contains: query /* Optional filter */,
              mode: 'insensitive',
            },
          },
        },
        select: {
          id: true,
          person: {
            select: {
              id: true,
              name: true,
              email: true,
              gender: true,
              promotional_email: true,
              created_at: true,
            },
          },
        },
        orderBy: {
          person: {
            name: 'asc',
          },
        },
      })
    }

    return {
      result: users,
      total,
    }
  }
}

export default UsersRepository
