import { ReasonForCancellationEnum } from '../../../prisma/generated/postgres';

export function getReasonForCancellationEnum(
  type: string,
): ReasonForCancellationEnum {
  const helpers: { [key: string]: ReasonForCancellationEnum } = {
    awaiting: ReasonForCancellationEnum.CUSTOMER_REQUEST,
    past_payment_date: ReasonForCancellationEnum.PAST_PAYMENT_DATE,
    product_out_of_stock: ReasonForCancellationEnum.PRODUCT_OUT_OF_STOCK,
  };

  const type1: ReasonForCancellationEnum =
    helpers[type] || ReasonForCancellationEnum.OTHERS;

  return type1;
}
