'use client'

import cn from '@/utils/cn'
import { ButtonGroupProps } from 'react-multi-carousel/lib/types'

interface CarouselButtonGroupProps extends ButtonGroupProps {
  className?: string
}

const CarouselButtonGroup = ({
  next,
  previous,
  carouselState,
}: CarouselButtonGroupProps) => {
  return (
    <div className="">
      <div className="absolute inset-y-0 left-0 ml-3 flex items-center">
        <button
          aria-label="Go to previous slide"
          onClick={() => previous?.()}
          className={cn(
            `z-0 flex h-10 w-10 transform items-center justify-center rounded-full bg-red-600 text-white shadow transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-red-100 hover:text-red-600 focus:outline-none`,
            carouselState && carouselState.currentSlide === 0 && 'invisible',
          )}
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="chevron-left h-6 w-6"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 mr-3 flex items-center">
        <button
          aria-label="Go to next slide"
          onClick={() => next?.()}
          className={cn(
            `flex h-10 w-10 transform items-center justify-center rounded-full bg-red-600 text-white shadow transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-red-100 hover:text-red-600 focus:outline-none`,
            carouselState &&
              carouselState.currentSlide ===
                carouselState.totalItems - carouselState.slidesToShow &&
              'invisible',
          )}
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="chevron-right h-6 w-6"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  )
}

export { CarouselButtonGroup }
