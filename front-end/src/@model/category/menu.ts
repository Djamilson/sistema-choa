import { ElementType } from 'react'

export default interface IMenu {
  id: string
  name: string
  slug: string
  toUpperCase: string
  href: string
  icon?: ElementType
}
