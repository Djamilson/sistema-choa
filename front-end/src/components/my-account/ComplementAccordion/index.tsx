import Image from 'next/image'

const ComplementAccordion = () => {
  return (
    <div className="flex w-full gap-3 border-b py-5 md:gap-5">
      <div className="aspect-square w-[50px] shrink-0 md:w-[120px]">
        <Image src={`/images/p1.png`} alt={`teste`} width={120} height={120} />
      </div>

      <div className="flex w-full flex-col">
        <div className="flex flex-col justify-between gap-2 md:flex-row">
          <div className="flex-1 text-sm font-medium text-black/[0.5]">
            <span className="line-clamp-2 leading-tight">jkjhhjjk</span>
          </div>

          <div className="flex flex-col items-end">
            <p className="md:text-md text-sm font-semibold text-gray-500 dark:text-gray-400">
              ppppppppassdfasdfsadfs
            </p>

            <div className="flex flex-row items-center justify-between gap-1 md:my-2">
              jhkjhkj
            </div>
          </div>
        </div>

        <div className="text-md -ml-12 block font-medium text-black/[0.5] md:-mt-2 md:ml-0">
          khkjhkhjkhkh
        </div>
      </div>
    </div>
  )
}

export { ComplementAccordion }
