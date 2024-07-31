type IItem = {
  id: string
}

type IProps = {
  array: IItem[]
}

export function removerDuplicatesElement({ array }: IProps) {
  return array.filter(
    (elem, index, self) => index === self.findIndex((t) => t.id === elem.id),
  )
}
