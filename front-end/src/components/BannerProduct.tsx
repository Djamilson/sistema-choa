'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
const image1 = '/images/banner/img1.webp'
const image1Mobile = '/images/banner/img1_mobile.jpg'
const image2 = '/images/banner/img2.webp'
const image2Mobile = '/images/banner/img2_mobile.webp'
const image3 = '/images/banner/img3.jpg'
const image3Mobile = '/images/banner/img3_mobile.jpg'
const image4 = '/images/banner/img4.jpg'
const image4Mobile = '/images/banner/img4_mobile.jpg'
const image5 = '/images/banner/img5.webp'
const image5Mobile = '/images/banner/img5_mobile.png'
const vercel = '/vercel.svg'

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0)
  const desktopImages = [vercel, image1, image2, image3, image4, image5]

  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ]

  const preveImage = () => {
    if (currentImage !== 0) {
      setCurrentImage((preve) => preve - 1)
    }
  }

  const nextImage = () => {
    if (desktopImages.length - 1 > currentImage) {
      setCurrentImage((preve) => preve + 1)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImages.length - 1 > currentImage) {
        nextImage()
      } else {
        setCurrentImage(0)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [currentImage, desktopImages.length, nextImage])

  return (
    <div className="container mx-auto rounded px-4 ">
      <div className="relative h-56 w-full bg-slate-200 md:h-72">
        <div className="absolute z-10 hidden h-full w-full items-center md:flex ">
          <div className=" flex w-full justify-between text-2xl">
            <button
              onClick={preveImage}
              className="rounded-full bg-white p-1 shadow-md"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className="rounded-full bg-white p-1 shadow-md"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/** desktop and tablet version */}
        <div className="hidden h-full w-full overflow-hidden md:flex">
          {desktopImages.map((imageURl) => {
            return (
              <div
                className="h-full min-h-full w-full min-w-full transition-all"
                key={imageURl}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <Image
                  className="relative h-full w-full object-cover dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                  src={imageURl}
                  alt="Next.js Logo"
                  width={180}
                  height={37}
                  priority
                />
              </div>
            )
          })}
        </div>

        {/** mobile version */}
        <div className="flex h-full w-full overflow-hidden md:hidden">
          {mobileImages.map((imageURl) => {
            return (
              <div
                className="h-full min-h-full w-full min-w-full transition-all"
                key={imageURl}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <Image
                  className="relative h-full w-full object-cover dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                  src={imageURl}
                  alt="Next.js Logo"
                  width={180}
                  height={37}
                  priority
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default BannerProduct
