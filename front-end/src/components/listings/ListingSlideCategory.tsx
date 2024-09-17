'use client'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { CategoryView } from '../CardCategory/CategoryView'
import { CarouselButtonGroup } from '../CardCategory/SlideSwiperCategory/Buttons'
import { Title } from '../Title'
import { LoadingPulseLoader } from '../loadings/LoadingPulseLoader'

const ListingSlideCategory = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1023, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 2,
    },
  }

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isFetching: isFetchingCategories,
  } = useCategories(TypeCategory.MENU)

  return (
    <div className="relative mt-[50px] md:mb-0 md:mt-[100px]">
      <div className="md:mb-6">
        <Title>Nossas categorias</Title>
      </div>
      {isLoadingCategories && isFetchingCategories && <LoadingPulseLoader />}
      {categories && categories.length > 0 && (
        <Carousel
          responsive={responsive}
          containerClass="-mx-[10px]"
          itemClass="px-[10px]"
          arrows={false}
          customTransition="all .5"
          partialVisible
          customButtonGroup={<CarouselButtonGroup />}
        >
            <div
              className="my-16 w-full p-0 pb-8 md:my-0 md:p-2 md:pb-6"
            >
              <CategoryView key={category.id} category={category} />
            </div>
        </Carousel>
      )}
    </div>
  )
}

export { ListingSlideCategory }
