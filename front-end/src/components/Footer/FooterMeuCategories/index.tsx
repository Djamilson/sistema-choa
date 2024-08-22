'use client'
import { NavLink } from '@/components/NavLink'
import { usePathname } from 'next/navigation'
import { RiArrowRightSLine } from 'react-icons/ri'

function FooterMeuCategories() {
  const pathname = usePathname()

  const activeElementClasses =
    'text-sm md:text-md text-accent shadow-gray-300 font-semibold'
  const nonActiveElementClasses =
    'text-sm md:text-md hover:font-semibold hover:translate-x-6 hover:-translate-y-1 hover:bg-opacity-20 transition-all hover:scale-105 shadow-gray-300'

  return (
    <div className="flex shrink-0 flex-col gap-1.5">
      <div className="my-6 ml-2 text-sm font-semibold uppercase">Menu</div>

      <NavLink href={`#`} icon={RiArrowRightSLine} className={``}>
        menu.toUpperCase
      </NavLink>
    </div>
  )
}

export { FooterMeuCategories }
