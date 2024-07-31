import { useState } from 'react'
import { AnimatedStarIcon } from './AnimatedStarIcon'

interface IProps {
  totalStarStart: number
  totalStarEnd: number
  fontSize: any
}

function Star({ totalStarStart, totalStarEnd, fontSize }: IProps) {
  const [hoverIndex, setHoverIndex] = useState<number>(-1)

  const handleHoverIndexChange = (index: number) => {
    setHoverIndex(index)
  }

  return (
    <>
      {Array(totalStarStart)
        .fill('')
        .map((_, i) => (
          <AnimatedStarIcon
            key={i}
            index={i}
            star={totalStarStart}
            totalStarEnd={totalStarEnd}
            color="yellow-400"
            hoverIndex={hoverIndex}
            onHoverIndexChange={handleHoverIndexChange}
            fontSize={fontSize}
          />
        ))}
    </>
  )
}

export { Star }
