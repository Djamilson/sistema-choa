import { TypeCategoryEnum } from '../../../prisma/generated/postgres';

export function getTypeCategoryEnum(type: string): TypeCategoryEnum {
  const helpers: { [key: string]: TypeCategoryEnum } = {
    menu: TypeCategoryEnum.MENU,
    slide: TypeCategoryEnum.SLIDE,
  };

  const type1: TypeCategoryEnum = helpers[type] || TypeCategoryEnum.MENU;

  return type1;
}
