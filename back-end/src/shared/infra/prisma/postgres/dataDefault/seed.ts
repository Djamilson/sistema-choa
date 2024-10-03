import { postgres } from '@shared/infra/prisma/lib/prismaClient'

import {
  groups,
  institutions,
  person,
  user,
  usersCompaniesGroups,
} from '@shared/infra/prisma/postgres/dataDefault'

const seed = async () => {
  try {
    const meInstitutions = postgres.institution.createMany({
      data: institutions,
    })

    const meGroups = postgres.group.createMany({
      data: groups,
    })

    const mePerson = postgres.person.create({
      data: person,
    })

    const result = await Promise.all([meGroups, mePerson, meInstitutions])

    await postgres.$transaction([
      postgres.user.create({
        data: user,
      }),
    ])

    await Promise.all([
      postgres.userCompanyGroup.createMany({
        data: usersCompaniesGroups,
      }),
    ])

    console.log(result)
    console.log('Sucesso initial data!!')
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await postgres.$disconnect()
  }
}

seed()
