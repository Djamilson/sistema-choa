'use client'

import { IPoliticSummary } from '@/@model/politic/politicSummary'
import { usePoliticsSummaries } from '@/hooks/Entity/usePolitics'
import { useEffect, useState } from 'react'
import { MessageComponent } from '../MessageComponent'
import { LoadingPulseLoader } from '../loadings/LoadingPulseLoader'
import { AccordionPolitic } from '../politics/politics/AccordionPolitic'

const ListingPolitics = () => {
  const [politicsSummaries, setPoliticsSummaries] = useState<IPoliticSummary[]>(
    [] as IPoliticSummary[],
  )

  const {
    data: politicsSummariesData,
    isLoading,
    isFetching,
  } = usePoliticsSummaries()

  useEffect(() => {
    if (politicsSummariesData && politicsSummariesData.length > 0) {
      setPoliticsSummaries(politicsSummariesData)
    }
  }, [politicsSummariesData])

  return (
    <>
      {isLoading && isFetching && <LoadingPulseLoader />}

      {politicsSummaries?.length < 1 && (
        <MessageComponent
          title="Ooops! não conseguimos encontrar política!"
          message="Tente novamente!"
        />
      )}

      {politicsSummaries &&
        politicsSummaries.length > 0 &&
        politicsSummaries.map((politicSummary) => {
          return (
            politicSummary?.politics_summaries_items?.length > 0 && (
              <AccordionPolitic
                key={politicSummary.id}
                title={politicSummary.title}
                subTitle={politicSummary.sub_title}
                politicsSummariesItems={
                  politicSummary?.politics_summaries_items
                }
              />
            )
          )
        })}
    </>
  )
}

export default ListingPolitics
