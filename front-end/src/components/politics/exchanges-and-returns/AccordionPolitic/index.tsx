import { IPoliticSummaryItem } from '@/@model/politic/politicSummary'
import { Accordion } from '@/components/Accordion'
import { MdCheckCircle } from 'react-icons/md'
import { ItemAccordionPolitic } from '../ItemAccordionPolitic'

type IAccordionPoliticProps = {
  title: string
  subTitle: string
  politics_summaries_items: IPoliticSummaryItem[]
}

function AccordionPolitic({
  title,
  subTitle,
  politics_summaries_items,
}: IAccordionPoliticProps) {
  return (
    <Accordion title={title}>
      <h3 className="my-4 ml-2 font-medium">{subTitle}</h3>

      {politics_summaries_items?.length > 0 &&
        politics_summaries_items.map((item) => {
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
