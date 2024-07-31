'use client'

import { useState } from 'react'
import { IoStar, IoStarHalf } from 'react-icons/io5'
import { animated, useSpring } from 'react-spring'

interface AnimatedStarIconProps {
  index: number
  star: number
  color: any
  hoverIndex: number
  totalStarEnd: number
  onHoverIndexChange: (index: number) => void
  fontSize: any
}

const AnimatedStarIcon = ({
  index,
  star,
  color,
  hoverIndex,
  onHoverIndexChange,
  totalStarEnd,
  fontSize,
}: AnimatedStarIconProps) => {
  const [hovered, setHovered] = useState(false)

  const isActive = index < star
  const isHovered = index <= hoverIndex && !isActive

  const animatedProps = useSpring({
    transform: `scale(${isHovered || hovered ? 1.2 : 1})`,
    padding: 0,
    color: isActive || isHovered || hovered ? 'bg-yellow-400' : `text-${color}`,
  })

  const isHalfStar =
    index === Math.floor(totalStarEnd) && totalStarEnd % 1 !== 0

  const starClassName = `w-5 ${fontSize} ${
    index < totalStarEnd ? 'text-yellow-400' : 'text-gray-300'
  }`

  return (
    <animated.div
      style={animatedProps}
      onMouseEnter={() => {
        setHovered(true)
        onHoverIndexChange(index)
      }}
      onMouseLeave={() => {
        setHovered(false)
        onHoverIndexChange(-1)
      }}
    >
      {isHalfStar && <IoStarHalf className={`${starClassName}`} />}
      {!isHalfStar && <IoStar className={`${starClassName}`} />}
    </animated.div>
  )
}

export { AnimatedStarIcon }
