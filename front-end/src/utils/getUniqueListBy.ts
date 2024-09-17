export function getUniqueListBy(arr: any) {
  return Object.values(
    arr.reduce(
      (acc: any, cur: any) => Object.assign(acc, { [cur.id]: cur }),
      {},
    ),
  )
}
