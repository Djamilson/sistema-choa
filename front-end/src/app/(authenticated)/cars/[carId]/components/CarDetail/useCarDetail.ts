import { meAnimatedScroll } from '@/hooks/AnimateScrooll/useAnimatedScroll'
import { useState } from 'react'

const useCarDetail = () => {
  const [selectedCarPhoto, setSelectedCarPhoto] = useState<any>({})
  const handleClickDetailCar = (detailCar: string) =>
    meAnimatedScroll({ id: detailCar })

  return { handleClickDetailCar, selectedCarPhoto }
}

export default useCarDetail
