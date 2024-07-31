'use client'

import { useCartStore } from '@/contexts/useCartStore'
import { useMemo, useState } from 'react'
import { BsFillBasket2Fill } from 'react-icons/bs'
import { IoMdHeartEmpty } from 'react-icons/io'
import BasketModal from '../Header/CardModal'

export default function CartOnFavorite() {
  const {
    state: { cartItems },
  } = useCartStore()

  const cartSize = useMemo(() => cartItems?.length, [cartItems])
  const [open, setOpen] = useState<boolean>(false)

  const handleOpenBasketModal = () => {
    setOpen(true)
  }

  const handleCloseBasketModal = () => {
    setOpen(false)
  }

  return (
    <div className="flex items-center gap-2 text-black">
      <div className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-black/[0.05] md:h-12 md:w-12">
        <IoMdHeartEmpty className={`text-[19px] text-white md:text-[24px]`} />
        <div
          className={`absolute left-5 top-1 flex h-[14px] min-w-[14px] items-center justify-center rounded-full bg-green-600 px-[2px] text-[10px] text-white md:left-7 md:h-[18px] md:min-w-[18px] md:px-[5px] md:text-[12px]`}
        >
          0
        </div>
      </div>

      <BasketModal open={open} onClose={handleCloseBasketModal} />
      <button type="button" onClick={() => handleOpenBasketModal()}>
        <div className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-black/[0.05] md:h-12 md:w-12">
          <BsFillBasket2Fill className="text-[15px] text-white md:text-[20px]" />

          <div className="absolute left-5 top-1 flex h-[14px] min-w-[14px] items-center justify-center rounded-full bg-green-600 px-[2px] text-[10px] text-white md:left-7 md:h-[18px] md:min-w-[18px] md:px-[5px] md:text-[12px]">
            {cartSize === 0 && `0`}
            {cartSize === 1 && `${cartSize}`}
            {cartSize > 1 && `${cartSize}`}
          </div>
        </div>
      </button>
    </div>
  )
}
