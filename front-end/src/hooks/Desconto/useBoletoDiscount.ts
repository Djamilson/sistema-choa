import { formatPrice } from '@/utils/formatPrice'
import { useEffect, useState } from 'react'

type IProps = {
  total: string
}

function convertStringToCurrency(str: string) {
  const digitsOnly = str.replace(/[^0-9,]/g, '')
  const num = parseFloat(digitsOnly.replace(',', '.'))
  return num
}

function applyDiscount(total: number, discountPercentage: number): string {
  const discount = total * (discountPercentage / 100)
  const discountedTotal = total - discount
  return formatPrice(discountedTotal)
}

function useBoletoDiscount({ total }: IProps) {
  const boleto_desconto: number = process.env.NEXT_PUBLIC_ENV_BOLETO_DESCONTO
    ? Number(process.env.NEXT_PUBLIC_ENV_BOLETO_DESCONTO)
    : 0

  const [totalBoleto, setTotalBoleto] = useState<string>('')

  useEffect(() => {
    if (boleto_desconto && boleto_desconto > 0 && total) {
      setTotalBoleto(
        applyDiscount(convertStringToCurrency(total), boleto_desconto),
      )
    }
  }, [boleto_desconto, total])

  return totalBoleto
}

export { useBoletoDiscount }
