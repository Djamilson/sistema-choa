'use client'

import { fadeIn } from '@/_constants/variants'
import { motion } from 'framer-motion'
import { LoadingPulseLoader } from '../loadings/LoadingPulseLoader'
import { Slider } from './Slider'
import { useSliderBanner } from './useSliderBanner'

function SlideBanner() {
  const { isLoadingBanners, isFetchingBanners, banners } = useSliderBanner()

  return (
    <motion.div
      variants={fadeIn({ direction: 'down', delay: 0.6 })}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="mx-auto w-full px-2"
    >
      {isLoadingBanners && isFetchingBanners && <LoadingPulseLoader />}
      {banners?.map((banner) => {
        return <Slider key={banner.id} photos={banner.images_banners} />
      })}
    </motion.div>
  )
}

export { SlideBanner }
