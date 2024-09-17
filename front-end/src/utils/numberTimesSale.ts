import { formatPrice } from '../utils/formatPrice'

type IProps = {
  price_promotion?: number
  price: number
  divided_into: number
}

export function numberTimesSale({
  price_promotion,
  price,
  divided_into,
}: IProps) {
  if (price_promotion) {
    return {
      numberVez: `${divided_into}x`,
      price: formatPrice(price_promotion / divided_into),
    }
  }

  return {
    numberVez: `${divided_into}x`,
    price: formatPrice(price / divided_into),
  }
}
