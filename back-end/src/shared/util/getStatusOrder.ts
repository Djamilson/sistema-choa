import { PurchaseStatusEnum } from '../../../prisma/generated/postgres';

export function getStatusOrder(type: string): PurchaseStatusEnum {
  const helpers: { [key: string]: PurchaseStatusEnum } = {
    awaiting: PurchaseStatusEnum.AWAITING,
    processing: PurchaseStatusEnum.PROCESSING,
    processed_all: PurchaseStatusEnum.PROCESSED_ALL,
    processed_in_part: PurchaseStatusEnum.PROCESSED_IN_PART,
  };

  const type1: PurchaseStatusEnum =
    helpers[type] || PurchaseStatusEnum.CANCELED;

  return type1;
}
