'use client'

import { IAggregationProduct } from '@/@model/aggregationProduct/aggregationProduct'
import { useSlide } from '@/hooks/Entity/useSlide'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Title } from '../Title'
import Skeleton from '../loadings/Skeleton'
import { CarouselButtonGroup } from './SlideSwiperCategory/Buttons'
import { CardAggregationProduct } from '../CardAggregationProduct'

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

const BestSellersSlideCategory = () => {
  const slideCategoryId = process.env.NEXT_PUBLIC_ENV_BEST_SELLERS_CATEGORY_ID!

  const {
    isLoading: slideIsloading,
    isFetching: slideIsFetching,
    products: slideProducts,
  } = useSlide({ categoryId: slideCategoryId })

  return (
    <div className="relative mb-[100px] mt-[50px] pb-2 md:mb-0 md:mt-[100px]">
      <Title>Os melhores das categorias</Title>

      {slideIsloading && slideIsFetching && <Skeleton />}

      {slideProducts && slideProducts?.aggregationProducts?.length > 0 && (
        <Carousel
          responsive={responsive}
          containerClass="-mx-[10px]"
          itemClass="px-[10px]"
          arrows={false}
          customTransition="all .5"
          partialVisible
          customButtonGroup={<CarouselButtonGroup />}
        >
          {slideProducts?.aggregationProducts?.map(
            (item: IAggregationProduct) => {
              return (
                <CardAggregationProduct
                  key={item.id}
                  aggregationProduct={item}
                />
              )
            },
          )}
        </Carousel>
      )}
    </div>
  )
}

export default BestSellersSlideCategory
