'use client'

import useFavorite from '@/hooks/useFavorite'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

interface HeartButtonProps {
  listingId: string
  currentUser?: null
}

const HeartButton = ({ listingId, currentUser }: HeartButtonProps) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  })

  return (
    <div
      onClick={toggleFavorite}
      className="
        relative
        cursor-pointer
        transition
        hover:opacity-80
      "
    >
      <AiOutlineHeart
        size={28}
        className="
          absolute
          -right-[2px]
          -top-[2px]
          fill-white
        "
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}
      />
    </div>
  )
}

export default HeartButton
