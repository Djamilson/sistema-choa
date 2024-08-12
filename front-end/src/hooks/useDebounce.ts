import { useEffect, useState } from 'react'

type IProps = {
  value: string
  setPage: (data: number) => void
  delay?: number
}

const useDebounce = ({ value, setPage, delay = 300 }: IProps): string => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
      setPage(1)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay, setPage])
  return debouncedValue
}

export { useDebounce }
