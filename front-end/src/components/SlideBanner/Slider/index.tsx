'use client'

import { IImageBanner } from '@/@model/banner/banner'
import { CarouselButtonGroup } from '@/components/CarouselButtonGroup'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { BannerView } from './BannerView'

type IProps = {
  photos: IImageBanner[]
}

const Slider = ({ photos }: IProps) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1023, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
    },
  }

  return (
    <div className="relative overflow-x-hidden md:mb-0">
      <Carousel
        responsive={responsive}
        containerClass="-mx-[10px]"
        itemClass="px-[10px]"
        arrows={false}
        customTransition="all .5"
        partialVisible
        customButtonGroup={<CarouselButtonGroup />}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
      >
        {photos.map((image) => (
          <BannerView key={image.id} banner_url={image.image_banner_url} />
        ))}
      </Carousel>
    </div>
  )
}

export { Slider }
