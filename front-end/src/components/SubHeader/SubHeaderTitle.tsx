type ISubHeaderTitleProps = {
  title: string
}

export function SubHeaderTitle({ title }: ISubHeaderTitleProps) {
  return <h3 className="h3">{title}</h3>
}
