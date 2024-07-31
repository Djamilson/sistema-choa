import IMenu from '@/@model/category/menu'
import { getCategoryIcon } from '@/utils/getCategoryIcon'
import { v4 as uuid } from 'uuid'
import ICategory from '../@model/category/category'

export function serializableMenuCategory(categories: ICategory[]): IMenu[] {
  return [
    {
      id: String(uuid()),
      name: 'Início',
      slug: 'inicio',
      icon: getCategoryIcon('inicio'),
      toUpperCase: 'INÍCIO',
      href: '/',
    },
    ...categories?.map((category) => {
      const { id, name, slug } = category

      return {
        id,
        name,
        slug,
        icon: getCategoryIcon(slug),
        toUpperCase: category.name.toUpperCase(),
        href: `/category/${category.id}`,
      }
    }),
    {
      id: String(uuid()),
      name: 'Contato',
      slug: 'contact',
      toUpperCase: 'CONTATO',
      icon: getCategoryIcon('contact'),
      href: '/contact',
    },
  ]
}
