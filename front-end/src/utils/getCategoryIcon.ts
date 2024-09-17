import { ElementType } from 'react'
import { BsHouseGear } from 'react-icons/bs'
import { FaCat } from 'react-icons/fa'
import { FcMediumPriority, FcSalesPerformance } from 'react-icons/fc'
import { GiFlowerPot, GiPresent, GiSittingDog } from 'react-icons/gi'
import { HiHome } from 'react-icons/hi'
import {
  MdContactPhone,
  MdOutlineDevicesOther,
  MdOutlineFireTruck,
} from 'react-icons/md'
import {
  RiContactsLine,
  RiCoupon3Line,
  RiDashboardLine,
  RiMapPinLine,
  RiShoppingBag3Line,
} from 'react-icons/ri'

export function getCategoryIcon(type: string): ElementType {
  const helpers: { [key: string]: ElementType } = {
    inicio: HiHome,
    casa: BsHouseGear,
    caes: GiSittingDog,
    decoracao: GiFlowerPot,
    gatos: FaCat,
    maisvendidos: FcSalesPerformance,
    eletronicos: MdOutlineDevicesOther,
    'minha-conta': RiDashboardLine,
    'meus-pedidos': RiShoppingBag3Line,
    'meus-vales': RiCoupon3Line,
    cadastro: RiContactsLine,
    endereco: RiMapPinLine,
    car: MdOutlineFireTruck,

    'oferta-do-dia': GiPresent,
    contact: MdContactPhone,
  }

  const type1: ElementType = helpers[type] || FcMediumPriority

  return type1
}
