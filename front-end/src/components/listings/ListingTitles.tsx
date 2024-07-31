'use client'

import { ITitleEcommerce } from '@/@model/titleEcommerce/titleEcommerce'
import { useTitlesEcommerces } from '@/hooks/Entity/useTitlesEcommerce'
import DOMPurify from 'dompurify'
import parse from 'html-react-parser'
import { useEffect, useState } from 'react'
import { LoadingPulseLoader } from '../loadings/LoadingPulseLoader'

const ListingTitles = () => {
  const {
    data: titleEcommercesData,
    isLoading,
    isFetching,
  } = useTitlesEcommerces()

  const [titlesEcommeces, setTitlesEcommeces] = useState<ITitleEcommerce[]>(
    [] as ITitleEcommerce[],
  )

  useEffect(() => {
    if (titleEcommercesData && titleEcommercesData.length > 0) {
      setTitlesEcommeces(titleEcommercesData)
    }
  }, [titleEcommercesData])

  return (
    <>
      {isLoading && isFetching && <LoadingPulseLoader />}
      {titlesEcommeces &&
        titlesEcommeces.map((titleEcommerce) => {
          return (
            <div
              key={titleEcommerce.id}
              className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1"
            >
              <div
                aria-hidden="true"
                className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
              >
                <div
                  style={{
                    clipPath:
                      'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                  }}
                  className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
              >
                <div
                  style={{
                    clipPath:
                      'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                  }}
                  className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
                />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                {parse(DOMPurify.sanitize(titleEcommerce.title_start))}
                {parse(DOMPurify.sanitize(titleEcommerce.title_center))}
                {parse(DOMPurify.sanitize(titleEcommerce.title_end))}
              </div>
              <div className="flex flex-1 justify-end"></div>
            </div>
          )
        })}
    </>
  )
}

export default ListingTitles
