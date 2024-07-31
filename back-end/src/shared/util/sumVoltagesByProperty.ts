export type ISumVoltagesByProperty = {
  totalSize: number;
  aggregationProductId: string;
  id: string;
  voltage: string;
};

export function sumVoltagesByProperty(
  arr: ISumVoltagesByProperty[],
  property: keyof ISumVoltagesByProperty,
): ISumVoltagesByProperty[] {
  const result: { [key: string]: number } = arr.reduce(
    (acc: any, obj: ISumVoltagesByProperty) => {
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
  })) as ISumVoltagesByProperty[];
}
