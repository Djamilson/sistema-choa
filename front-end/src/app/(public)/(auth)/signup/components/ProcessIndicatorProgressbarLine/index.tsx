import cn from '@/utils/cn'

type IProcessIndicatorProgressBar = {
  value: number
  currentStep: number
  className?: string
}

const ProcessIndicatorProgressBarLine = ({
  currentStep,
  value,
  className,
}: IProcessIndicatorProgressBar) => {
  return (
    <div
      className={cn(
        `ml-0 flex h-1 w-full overflow-hidden`,
        currentStep > value ? 'bg-white' : 'bg-neutral-300',
        className,
      )}
      role="progressbar"
    >
      <div
        className={`flex flex-col justify-center overflow-hidden whitespace-nowrap transition duration-500`}
        style={{ width: currentStep > value ? '110%' : '0%' }}
      ></div>
    </div>
  )
}

export default ProcessIndicatorProgressBarLine
