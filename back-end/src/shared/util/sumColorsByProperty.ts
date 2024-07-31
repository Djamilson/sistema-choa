export type ISumColorsByProperty = {
  totalColor: number;
  aggregationProductId: string;
  id: string;
  color: string;
};

export function sumColorsByProperty(
  arr: ISumColorsByProperty[],
  property: keyof ISumColorsByProperty,
): ISumColorsByProperty[] {
  const result: { [key: string]: number } = arr.reduce(
    (acc: any, obj: ISumColorsByProperty) => {
      
      const valueProperty: string | number = obj[property];
      if (valueProperty) {
        acc[valueProperty] = (acc[valueProperty] || 0) + obj.totalColor;
      }
      return acc;
    },
    {},
  );

  return Object.entries(result).map(([valueProperty, total]) => ({
    ...arr.find(obj => obj[property] === valueProperty),
    totalColor: total,
  })) as ISumColorsByProperty[];
}
