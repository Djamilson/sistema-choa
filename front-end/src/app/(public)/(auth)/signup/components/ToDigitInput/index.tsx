import { useToDigitInput } from './useToDigitInput'

type IToDigitInput = {
  idx: number
  code: string
  cellCount: number
  containerIsFocused: boolean
}

export const ToDigitInput = ({
  idx,
  code,
  cellCount,
  containerIsFocused = false,
}: IToDigitInput) => {
  const { digit, containerStyle } = useToDigitInput({
    idx,
    code,
    cellCount,
    containerIsFocused,
  })

  return (
    <div
      key={idx}
      className={`border-1.5 mx-2 flex h-12 w-10 items-center justify-center shadow-md ${containerStyle}`}
    >
      <span className="text-2xl">{digit}</span>
    </div>
  )
}
