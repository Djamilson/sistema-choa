'use client'

import Container from '@/components/Container'
import { TypeCategory, useCategories } from '@/hooks/Entity/useCategories'
import { getCategoryIcon } from '@/utils/getCategoryIcon'
import { serializableMenuCategory } from '@/utils/serializableMenuCategory'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { LoadingPulseLoader } from '../loadings/LoadingPulseLoader'
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
  const filterMenu = ['contact']

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isFetching: isFetchingCategories,
  } = useCategories(TypeCategory.MENU)

  const menus = useMemo(
    () =>
      categories &&
      serializableMenuCategory(categories).filter((item) =>
        filterMenu.includes(item.slug),
      ),
    [categories, filterMenu],
  )

  const count = (menus && menus?.length) || 0
  const pathname = usePathname()

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
              {isLoadingCategories && isFetchingCategories && (
                <LoadingPulseLoader />
              )}
              {menus &&
                menus?.length > 0 &&
                menus?.map((menu: any, index: any) => {
                  return (
                    <div
                      key={menu.id}
                      className="flex flex-row text-sm lowercase text-white"
                    >
                      <NavLink
                        href={menu.href}
                        className={`${
                          pathname === menu.href
                            ? activeElementClasses
                            : nonActiveElementClasses
                        }`}
                      >
                        {menu.toUpperCase}
                      </NavLink>

                      {index + 1 < count && (
                        <div className="border-left-[1px] hidden flex-1 px-2 text-center text-sm text-neutral-500 sm:block">
                          |
                        </div>
                      )}
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
