'use client'
import { NavLink } from '@/components/NavLink'
import { LoadingPulseLoader } from '@/components/loadings/LoadingPulseLoader'
import { TypeCategory, useCategories } from '@/hooks/Entity/useCategories'
import { serializableMenuCategory } from '@/utils/serializableMenuCategory'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { RiArrowRightSLine } from 'react-icons/ri'

function FooterMeuCategories() {
  const {
    data: categories,
    isLoading: isLoadingCategories,
    isFetching: isFetchingCategories,
  } = useCategories(TypeCategory.MENU)

  const menus = useMemo(
    () => categories && serializableMenuCategory(categories),
    [categories],
  )

  const pathname = usePathname()

  const activeElementClasses =
    'text-sm md:text-md text-accent shadow-gray-300 font-semibold'
  const nonActiveElementClasses =
    'text-sm md:text-md hover:font-semibold hover:translate-x-6 hover:-translate-y-1 hover:bg-opacity-20 transition-all hover:scale-105 shadow-gray-300'

  return (
    <div className="flex shrink-0 flex-col gap-1.5">
      <div className="my-6 ml-2 text-sm font-semibold uppercase">Menu</div>

      {isLoadingCategories && isFetchingCategories && <LoadingPulseLoader />}

      {menus &&
        menus?.length > 0 &&
        menus.map((menu: any) => {
          return (
            <NavLink
              key={menu.id}
              href={menu.href}
              icon={RiArrowRightSLine}
              className={`${
                pathname === menu.href
                  ? activeElementClasses
                  : nonActiveElementClasses
              }`}
            >
              {menu.toUpperCase}
            </NavLink>
          )
        })}
    </div>
  )
}

export { FooterMeuCategories }
