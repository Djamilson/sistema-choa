import IMenuPolitic from '../@model/politic/menuPolitic'

export function serealizableMenuPolitic(
  politics: IMenuPolitic[],
): IMenuPolitic[] {
  return [
    ...politics?.map((politic) => {
      const { id } = politic

      return {
        ...politic,
        href: `/politic/${id}`,
      }
    }),
  ]
}
