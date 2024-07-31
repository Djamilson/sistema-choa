export type ISumSizesByProperty = {
  totalSize: number;
  aggregationProductId: string;
  id: string;
  description: string;
  acronym: string;
};

export function sumSizesByProperty(
  arr: ISumSizesByProperty[],
  property: keyof ISumSizesByProperty,
): ISumSizesByProperty[] {
  const result: { [key: string]: number } = arr.reduce(
    (acc: any, obj: ISumSizesByProperty) => {
      const valueProperty: string | number = obj[property];
      if (valueProperty) {
        acc[valueProperty] = (acc[valueProperty] || 0) + obj.totalSize;
      }
      return acc;
    },
    {},
  );

  return Object.entries(result).map(([valueProperty, total]) => ({
    ...arr.find(obj => obj[property] === valueProperty),
    totalSize: total,
  })) as ISumSizesByProperty[];
}
