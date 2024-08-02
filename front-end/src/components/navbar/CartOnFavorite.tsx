'use client'

import { IoMdHeartEmpty } from 'react-icons/io'

export default function CartOnFavorite() {
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
    </div>
  )
}
