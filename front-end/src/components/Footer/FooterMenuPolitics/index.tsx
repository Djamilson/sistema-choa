'use client'
import { NavLink } from '@/components/NavLink'
import { LoadingPulseLoader } from '@/components/loadings/LoadingPulseLoader'
import { usePolitics } from '@/hooks/Entity/usePolitics'
import { serealizableMenuPolitic } from '@/utils/serealizableMenuPolitic'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { RiArrowRightSLine } from 'react-icons/ri'

function FooterMenuPolitics() {
  const pathname = usePathname()

  const {
    data: menusPolitics,
    isLoading: isLoadingMenuPolitics,
    isFetching: isFetchingMenuPolitics,
  } = usePolitics()

  const menus = useMemo(
    () => menusPolitics && serealizableMenuPolitic(menusPolitics),
    [menusPolitics],
  )

  const activeElementClasses =
    'md:text-md text-accent shadow-gray-300 font-semibold'
  const nonActiveElementClasses =
    'md:text-md hover:font-semibold hover:translate-x-6 hover:-translate-y-1 hover:bg-opacity-20 transition-all hover:scale-105 shadow-gray-300'

  return (
    <div className="flex flex-col gap-1.5 text-sm">
      <div className="my-6 ml-2 font-semibold uppercase">Políticas</div>
      {isLoadingMenuPolitics && isFetchingMenuPolitics && (
        <LoadingPulseLoader />
      )}

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

export { FooterMenuPolitics }
