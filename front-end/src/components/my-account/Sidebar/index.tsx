'use client'

import cn from '@/utils/cn'
import { getCategoryIcon } from '@/utils/getCategoryIcon'
import { usePathname } from 'next/navigation'
import { v4 as uuid } from 'uuid'
import { NavLink } from './NavLink'

const menusSidebar = [
  {
    id: String(uuid()),
    name: 'Início',
    slug: 'inicio',
    icon: getCategoryIcon('inicio'),
    toUpperCase: 'inicio',
    href: '/',
  },
  {
    id: String(uuid()),
    name: 'Minha conta',
    slug: 'inicio',
    icon: getCategoryIcon('minha-conta'),
    toUpperCase: 'minha-conta',
    href: '/my-account',
  },
  {
    id: String(uuid()),
    name: 'Cadastro',
    slug: 'cadastro',
    icon: getCategoryIcon('cadastro'),
    toUpperCase: 'cadastro',
    href: '/info-collaborator',
  },
  {
    id: String(uuid()),
    name: 'Meus pedidos',
    slug: 'meus-pedidos',
    icon: getCategoryIcon('meus-pedidos'),
    toUpperCase: 'meus-pedidos',
    href: '/request',
  },
  {
    id: String(uuid()),
    name: 'Endereço',
    slug: 'endereco',
    icon: getCategoryIcon('endereco'),
    toUpperCase: 'endereço',
    href: '/address',
  },
  {
    id: String(uuid()),
    name: 'Viaturas',
    slug: 'viaturas',
    icon: getCategoryIcon('endereco'),
    toUpperCase: 'viaturas',
    href: '/cars',
  },
  {
    id: String(uuid()),
    name: 'outra',
    slug: 'outros',
    icon: getCategoryIcon('endereco'),
    toUpperCase: 'outros',
    href: '/outros',
  },
  {
    id: String(uuid()),
    name: 'outra',
    slug: 'outros',
    icon: getCategoryIcon('endereco'),
    toUpperCase: 'outros',
    href: '/outros',
  },
  {
    id: String(uuid()),
    name: 'outra',
    slug: 'outros',
    icon: getCategoryIcon('endereco'),
    toUpperCase: 'outros',
    href: '/outros',
  },
]

const SideBar = () => {
  const pathname = usePathname()

  const activeElementClasses =
    'py-3 bg-accent text-white md:mx-0 shadow-md shadow-gray-300 items-center'

  const nonActiveElementClasses =
    'py-2 hover:bg-blue-500 hover:bg-opacity-20 md:-mx-4 transition-all hover:scale-105 transform hover:translate-x-6 hover:shadow-md shadow-gray-300 items-center'

  return (
    <div className="mb-5 w-full max-w-sm bg-white md:block">
      <div className="pb-6">
        {menusSidebar &&
          menusSidebar?.length > 0 &&
          menusSidebar?.map((category) => {
            return (
              <NavLink
                icon={category?.icon}
                key={category.id}
                href={category.href}
                title={category.name}
                className={cn(
                  'md:text-md my-1 flex w-full justify-start gap-1  px-6 text-sm md:gap-3 md:px-4',
                  pathname === category.href
                    ? activeElementClasses
                    : nonActiveElementClasses,
                )}
              />
            )
          })}
      </div>
    </div>
  )
}

export default SideBar
