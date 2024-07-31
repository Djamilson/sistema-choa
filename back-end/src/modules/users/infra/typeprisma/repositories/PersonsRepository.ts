import { IPropsUpdateData } from '@modules/__DTOS'
import { ICreatePersonDTO } from '@modules/users/dtos/ICreateDTO'
import IPersonsRepository from '@modules/users/repositories/IPersonsRepository'
import { postgres } from '@shared/infra/prisma/lib/prismaClient'
import { Person } from '../entities/Person'

class PersonsRepository implements IPersonsRepository {
  private prismaRepository = postgres

  constructor() {
    this.prismaRepository
  }

  public async findById(id: string): Promise<Person | null> {
    return this.prismaRepository.person.findUnique({
      where: { id },
      select: {
        id: true,
        avatar: true,
        birth_date: true,
        gender: true,
        promotional_email: true,
        cpf: true,
        email: true,
        name: true,
        phone_id: true,
        address_id: true,
        rg: true,
        rgss: true,
        privacy: true,
        status: true,

        phone: {
          select: {
            id: true,
            person_id: true,
            phone: true,
          },
        },

      },
    }) as unknown as Person
  }



  public async findAllPhonesToPersonId(id: string): Promise<Person | null> {
    return this.prismaRepository.person.findUnique({
      where: { id },
      select: {
        id: true,
        phone_id: true,
        phones: {
          select: {
            id: true,
            phone: true,
          },
        },
      },
    }) as unknown as Person
  }

  public async findByEmail(email: string): Promise<Person | null> {
    const person = await this.prismaRepository.person.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        gender: true,
        promotional_email: true,
        status: true,
        privacy: true,
        avatar: true,
      },
    })

    return person as unknown as Person
  }

  public async findByCPF(cpf: string): Promise<Person | null> {
    const person = await this.prismaRepository.person.findFirst({
      where: { cpf },
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        privacy: true,
        avatar: true,
      },
    })

    return person as unknown as Person
  }

  public async create(data: ICreatePersonDTO): Promise<Person> {
    return this.prismaRepository.person.create({
      data,
    }) as unknown as Person
  }

  public async update({ id, updateData }: IPropsUpdateData): Promise<Person> {
    console.log('Vou altualizar: id, updateData', id, updateData)

    const person = await this.prismaRepository.person.update({
      where: {
        id: String(id),
      },
      data: updateData,
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
    })
    return person as unknown as Person
  }
}

export default PersonsRepository
