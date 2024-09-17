'use client'

import { usePathname, useRouter } from 'next/navigation'
import { NavButton } from './NavButton'

type IListingCategoriesProps = {
  onClose: () => void
}

const ListingCategories = ({ onClose }: IListingCategoriesProps) => {
  const pathname = usePathname()

  const { push } = useRouter()

  const activeElementClasses =
    'text-sm md:text-md flex gap-1 md:gap-3 py-3 my-1 bg-accent text-white md:mx-0 px-6 md:px-4  shadow-md shadow-gray-300 items-center'
  const nonActiveElementClasses =
    'text-sm md:text-md flex gap-1 md:gap-3 py-2 my-2 hover:bg-blue-500 hover:bg-opacity-20 md:-mx-4 px-6 md:px-4  transition-all hover:scale-110 hover:shadow-md shadow-gray-300 items-center'

  function handleNavButton(href: string) {
    push(href)
    onClose()
  }

  return (
    <>
      <div className="mb-5 w-full bg-white md:block ">
        <div className="pb-6">
          <NavButton
            onClick={() => handleNavButton(`#`)}
            title={`teste`}
            className={nonActiveElementClasses}
          />
        </div>
      </div>
    </>
  )
}

export default ListingCategories
