'use client'

import IPolitic from '@/@model/politic/politic'
import { usePoliticByPoliticId } from '@/hooks/Entity/usePolitics'
import { useEffect, useState } from 'react'
import { LoadingPulseLoader } from '../loadings/LoadingPulseLoader'

type IGetPoliticByPoliticIdProps = {
  params: {
    politicId: string
  }
}

const GetPoliticByPoliticId = ({ params }: IGetPoliticByPoliticIdProps) => {
  const { politicId } = params

  const {
    data: mePolitic,
    isLoading: isLoadingPolitic,
    isFetching: isFetchingPolitic,
  } = usePoliticByPoliticId(String(politicId))

  const [politic, setPolitic] = useState<IPolitic>({} as IPolitic)

  useEffect(() => {
    if (typeof mePolitic === 'object' && mePolitic !== null && mePolitic.id) {
      setPolitic(mePolitic)
    }
  }, [mePolitic])

  return (
    <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-2xl">
        <div className="grid gap-12">
          <div className="mt-3">
            {isLoadingPolitic && isFetchingPolitic && <LoadingPulseLoader />}

            {politic?.description_formatted?.map((content) => {
              return (
                <div
                  key={String(new Date())}
                  className="mt-1 text-gray-600 dark:text-gray-400"
                  dangerouslySetInnerHTML={{
                    __html: content,
                  }}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GetPoliticByPoliticId
