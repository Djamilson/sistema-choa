'use client'

import { LoadingPulseLoader } from '@/components/loadings/LoadingPulseLoader'
import { NavLink } from '@/components/NavLink'

import { serializableMenuCategory } from '@/utils/serializableMenuCategory'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

export function SideBarNavMenuCategory() {
  const pathname = usePathname()

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isFetching: isFetchingCategories,
  } = useCategories(TypeCategory.MENU)

  const menus = useMemo(
    () => categories && serializableMenuCategory(categories),
    [categories],
  )
  const count = (menus && menus?.length) || 0

  const activeElementClasses =
    'text-sm md:text-md text-accent border-b-[2px] shadow-gray-300 font-semibold border-b-accent'
  const nonActiveElementClasses =
    'text-sm md:text-md hover:border-neutral-500 hover:font-semibold hover:-translate-y-1 hover:border-b-[1px] hover:bg-opacity-20 transition-all hover:scale-110 shadow-gray-300'

  return (
    <div className="flex flex-row items-center justify-end">
      {isLoadingCategories && isFetchingCategories && <LoadingPulseLoader />}
      {menus &&
        menus?.length > 0 &&
        menus?.map((menu: any, index: any) => {
          return (
            <div
              key={menu.id}
              className="flex flex-row text-sm lowercase text-stone-600"
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
  )
}
