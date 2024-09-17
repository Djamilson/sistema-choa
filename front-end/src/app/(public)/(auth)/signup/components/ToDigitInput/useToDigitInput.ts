type IUseToDigitInput = {
  idx: number
  code: string
  cellCount: number
  containerIsFocused: boolean
}

export const useToDigitInput = ({
  idx,
  code,
  cellCount,
  containerIsFocused,
}: IUseToDigitInput) => {
  const emptyInputChar = ' '
  const digit = code?.[idx] || emptyInputChar
  const isCurrentDigit = idx === code?.length
  const isLastDigit = idx === cellCount - 1
  const isCodeFull = code?.length === cellCount

  const isFocused = isCurrentDigit || (isLastDigit && isCodeFull)
  const containerStyle =
    containerIsFocused && isFocused ? 'border-blue-500' : 'border-gray-300'

  return { digit, containerStyle }
}
