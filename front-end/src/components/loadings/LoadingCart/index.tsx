'use client'

import { Player } from '@lottiefiles/react-lottie-player'
import { useRef } from 'react'
import loadingCar from '../../../../public/js/loadingCart.json'

const LoadingCart = () => {
  const ref = useRef(null)

  return (
    <Player
      id="firstLottie"
      ref={ref}
      autoplay
      controls
      loop
      src={loadingCar}
      style={{
        height: '25%',
        width: '25%',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
      }}
    ></Player>
  )
}

export { LoadingCart }
