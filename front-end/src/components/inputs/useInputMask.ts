import { useCallback, useEffect, useRef } from 'react'

interface UseInputMaskOptions {
  mask: string
}

export const useInputMask = ({ mask }: UseInputMaskOptions) => {
  const inputElRef = useRef<HTMLInputElement | null>(null)

  const ref = useCallback((node: HTMLInputElement) => {
    if (node) {
      inputElRef.current = node
    }
  }, [])

  const onKeyUp = useCallback(() => {
    if (!inputElRef.current || !mask) {
      return
    }

    const separators = mask.match(/([^a-zA-Z0-9\*])/g) || []

    const regex = new RegExp(
      mask
        .replace(/([^a-zA-Z0-9\*])/g, '-')
        .split('-')
        .reduce((acc, curr) => {
          if (/^[0-9]/.test(mask)) {
            acc = acc.concat(`([0-9]{${curr.length}})`)
            return acc
          }
          if (/^[a-zA-Z]/.test(mask)) {
            acc = acc.concat(`([a-zA-Z]{${curr.length}})`)
            return acc
          }
          return '/ /g'
        }, ''),
      'g',
    )

    const replacer = mask
      .replace(/([^a-zA-Z0-9\*])/g, '-')
      .split('-')
      .reduce((acc, curr, index) => {
        acc = acc.concat(`$${index + 1}${separators[index] || ''}`)
        return acc
      }, '')

    if (/^[0-9]/.test(mask)) {
      inputElRef.current.value = inputElRef.current.value.replace(/[^0-9]/g, '')
    }

    if (/^[a-zA-Z]/.test(mask)) {
      inputElRef.current.value = inputElRef.current.value.replace(
        /[^a-zA-Z]/g,
        '',
      )
    }

    inputElRef.current.value = inputElRef.current.value
      .substring(0, mask.replace(/([^a-zA-Z0-9\*])/g, '').length)
      .replace(regex, replacer)
  }, [mask])

  useEffect(() => {
    if (inputElRef.current) {
      inputElRef.current.setAttribute('placeholder', mask)
    }
  }, [mask])

  return {
    ref,
    onKeyUp,
  }
}
