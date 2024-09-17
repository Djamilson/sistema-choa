'use client'

import { IBrand } from '@/@model/car'
import { useBrandByBrandId } from '@/hooks/Entity/useBrands'
import { useEffect, useState } from 'react'

type IUseBrandEditProps = {
  brandId: string
}

export const useBrandEdit = ({ brandId }: IUseBrandEditProps) => {
  const [selectBrandVisible, setSelectBrandVisible] = useState<IBrand>(
    {} as IBrand,
  )

  const [initialBrand, setInitialBrand] = useState<IBrand>({} as IBrand)

  const {
    data: brand,
    isLoading,
    isFetching,
    error,
  } = useBrandByBrandId(brandId)

  useEffect(() => {
    if (brand && brand?.id) {
      setInitialBrand(brand)
    }
  }, [brand])

  function closeBrandVisible() {
    setSelectBrandVisible({} as IBrand)
  }

  return {
    initialBrand,
    setInitialBrand,
    selectBrandVisible,
    closeBrandVisible,
    setSelectBrandVisible,
  }
}
