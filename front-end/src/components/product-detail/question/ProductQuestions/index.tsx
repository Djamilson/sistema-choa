import { Accordion } from '@/components/Accordion'
import { Button } from '@/components/buttons/Button'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

type IProductQuestionsProps = {
  title: string
  children: ReactNode
  productId: string
  aggregationProductId: string
}

function ProductQuestions({
  title,
  productId,
  aggregationProductId,
  children,
}: IProductQuestionsProps) {
  const { push } = useRouter()

  return (
    <Accordion title={title}>
      <div className="mt-2 flex flex-col gap-[4px]">
        <header className="flex items-center justify-between px-4 lg:flex-row">
          <div className="flex text-sm font-semibold text-neutral-500  md:text-base">
            vem tirar suas dúvidas
          </div>
          <div className="flex">
            <Button
              type="button"
              onClick={() =>
                push(`/questions/${productId}/${aggregationProductId}`)
              }
            >
              escrever pergunta
            </Button>
          </div>
        </header>
        <hr className="my-2 h-px border-0 bg-gray-200 md:my-8 dark:bg-gray-700" />
        {children}
      </div>
    </Accordion>
  )
}
export { ProductQuestions }
