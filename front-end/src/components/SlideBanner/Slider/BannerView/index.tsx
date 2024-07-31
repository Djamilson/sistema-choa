'use client'

import Image from 'next/image'

type IBannerProps = {
  banner_url: string
}

function BannerView({ banner_url }: IBannerProps) {
  return (
    <div className="group mx-auto w-full overflow-hidden rounded-none shadow-md transition-shadow duration-300 ease-in-out hover:-translate-y-2 hover:transform sm:hover:border-b-4 sm:hover:border-b-accent">
      <div className="flex h-[300px] cursor-pointer bg-[rgba(65,47,123,0.15)] px-6 py-8 transition-all duration-300 hover:bg-[rgba(89,65,169,0.15)] sm:flex-col sm:gap-x-0">
        <Image src={banner_url} alt="banner top" fill priority />
      </div>
    </div>
  )
}
export { BannerView }
