'use client'

import { IBanner } from '@/@model/banner/banner'
import { useBanners } from '@/hooks/Entity/useBanners'
import { useEffect, useState } from 'react'

export const useSliderBanner = () => {
  const publisherBanner = true
  const localedBanner = 'top'

  const [banners, setBanners] = useState<IBanner[]>([] as IBanner[])

  const {
    data: dataBanners,
    isLoading: isLoadingBanners,
    isFetching: isFetchingBanners,
  } = useBanners(publisherBanner)

  useEffect(() => {
    if (!!dataBanners && dataBanners.length > 0) {
      setBanners(dataBanners.filter((banner) => banner.type === localedBanner))
    }
  }, [dataBanners])

  return {
    isLoadingBanners,
    isFetchingBanners,
    banners,
  }
}
