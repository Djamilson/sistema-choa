'use client'

import { IAggregationProduct } from '@/@model/aggregationProduct/aggregationProduct'
import { useSlide } from '@/hooks/Entity/useSlide'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { CardAggregationProduct } from '../CardAggregationProduct'
import { Title } from '../Title'
import Skeleton from '../loadings/Skeleton'
import { CarouselButtonGroup } from './SlideSwiperCategory/Buttons'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1023, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: 2,
  },
}

const RelatedSlideProducts = () => {
  const slideCategoryId = process.env.NEXT_PUBLIC_ENV_SLIDE_CATEGORY_ID!

  const {
    isLoading: slideIsloading,
    isFetching: slideIsFetching,
    products: slideProducts,
  } = useSlide({ categoryId: slideCategoryId })

  return (
    <div className="relative mb-[10px] mt-[50px] pb-2 md:mb-0 md:mt-[100px]">
      <div className="md:pb-6">
        <Title>Mais vendidos</Title>
      </div>

      {slideIsloading && slideIsFetching && <Skeleton />}

      {slideProducts && slideProducts?.aggregationProducts?.length > 0 && (
        <Carousel
          responsive={responsive}
          containerClass="-mx-[0px]"
          itemClass="px-[0px]"
          arrows={false}
          customTransition="all .5"
          partialVisible
          customButtonGroup={<CarouselButtonGroup />}
        >
          {slideProducts?.aggregationProducts?.map(
            (item: IAggregationProduct) => {
              return (
                <div
                  className="my-10 -ml-2 w-full p-2 pb-8 md:my-0 md:p-2 md:pb-6"
                  key={item.id}
                >
                  <CardAggregationProduct aggregationProduct={item} />
                </div>
              )
            },
          )}
        </Carousel>
      )}
    </div>
  )
}

export default RelatedSlideProducts
