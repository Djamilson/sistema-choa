import { postgres } from '@shared/infra/prisma/lib/prismaClient'

import {
  brands,
  categories,
  colorsProducts,
  groups,
  person,
  politics,
  politicsSummaries,
  politicsSummariesItems,
  receiver,
  sizesProducts,
  titlesEcommerce,
  typesProducts,
  unitMeasurement,
  user,
  usersCompaniesGroups,
  voltages,
  words,
} from '@shared/infra/prisma/postgres/dataDefault'

const seed = async () => {
  try {
    const meColorsProducts = postgres.colorProduct.createMany({
      data: colorsProducts,
    })
    const meSizesProducts = postgres.sizeProduct.createMany({
      data: sizesProducts,
    })

    const meTypesProducts = postgres.typeProduct.createMany({
      data: typesProducts,
    })

    const meWords = postgres.word.createMany({
      data: words,
    })

    const meBrands = postgres.brand.createMany({
      data: brands,
    })

    const meCategories = postgres.category.createMany({
      data: categories,
    })

    const meVoltagesProducts = postgres.voltageProduct.createMany({
      data: voltages,
    })

    const meGroups = postgres.group.createMany({
      data: groups,
    })

    const mePersons = postgres.person.create({
      data: person,
    })

    const meUnitMeasurement = postgres.unitMeasurement.createMany({
      data: unitMeasurement,
    })

    const mePolitics = postgres.politic.createMany({
      data: politics,
    })

    const result = await Promise.all([
      meWords,
      meVoltagesProducts,
      meColorsProducts,
      meTypesProducts,
      meSizesProducts,
      meGroups,
      mePersons,
      meBrands,
      meCategories,
      mePolitics,
      meUnitMeasurement,
    ])

    await postgres.$transaction([
      postgres.user.create({
        data: user,
      }),
      postgres.politicSummary.createMany({
        data: politicsSummaries,
      }),
    ])

    await Promise.all([
      postgres.receiver.create({
        data: receiver,
      }),

      postgres.userCompanyGroup.createMany({
        data: usersCompaniesGroups,
      }),

      postgres.politicSummaryItem.createMany({
        data: politicsSummariesItems,
      }),

      postgres.titleEcommerce.createMany({
        data: titlesEcommerce,
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
