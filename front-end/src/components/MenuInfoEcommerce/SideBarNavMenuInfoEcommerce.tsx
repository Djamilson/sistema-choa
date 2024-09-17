'use client'

import Container from '@/components/Container'
import { getCategoryIcon } from '@/utils/getCategoryIcon'
import { NavLink } from '../NavLink'

export const listSideBarNavMenuInfoEcommerces = [
  {
    id: '111',
    href: '/contact',
    icon: getCategoryIcon('oferta-do-dia'),
    label: 'oferta do dia',
  },
  {
    id: '222',
    href: '/contact',
    label: 'contato',
    icon: getCategoryIcon('contact'),
  },
]

export function SideBarNavMenuInfoEcommerce() {
  const activeElementClasses =
    'text-sm md:text-md text-accent border-b-[2px] shadow-gray-300 font-semibold border-b-accent'
  const nonActiveElementClasses =
    'text-sm md:text-md hover:border-neutral-500 hover:font-semibold hover:-translate-y-1 hover:border-b-[1px] hover:bg-opacity-20 transition-all hover:scale-110 shadow-gray-300'

  return (
    <div className="w-full border-b-[1px] bg-accent shadow-sm">
      <Container>
        <div className="flex w-full flex-row items-center justify-end py-2">
          <div className="hidden flex-row md:block">
            <div className="flex flex-row items-center justify-end">
              <div className="flex flex-row text-sm lowercase text-white">
                <NavLink href={'#'} className={nonActiveElementClasses}>
                  menu.toUpperCase
                </NavLink>

                <div className="border-left-[1px] hidden flex-1 px-2 text-center text-sm text-neutral-500 sm:block">
                  |
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
