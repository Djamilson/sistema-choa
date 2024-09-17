import { IPoliticSummaryItem } from '@/@model/politic/politicSummary'
import { Accordion } from '@/components/Accordion'
import { MdCheckCircle } from 'react-icons/md'
import { ItemAccordionPolitic } from '../ItemAccordionPolitic'

type IAccordionPoliticProps = {
  title: string
  subTitle: string
  politicsSummariesItems: IPoliticSummaryItem[]
}

function AccordionPolitic({
  title,
  subTitle,
  politicsSummariesItems,
}: IAccordionPoliticProps) {
  return (
    <Accordion title={title}>
      <h3 className="my-4 ml-2 font-medium">{subTitle}</h3>

      {politicsSummariesItems?.length > 0 &&
        politicsSummariesItems.map((item) => {
          return (
            <ItemAccordionPolitic key={item.id} icon={MdCheckCircle}>
              {item.description}
            </ItemAccordionPolitic>
          )
        })}
    </Accordion>
  )
}
export { AccordionPolitic }
