import { Breadcrumb } from '@/components/Breadcrumb'
import { ItemBreadcrumb } from '@/components/Breadcrumb/ItemBreadcrumb'
import { ItemBreadcrumbLink } from '@/components/Breadcrumb/ItemBreadcrumbLink'
import Container from '@/components/Container'
import ContainerSession from '@/components/ContainerSession'
import { CookiesWithDismiss } from '@/components/CookiesWithDismiss'
import Footer from '@/components/Footer'
import { Header } from '@/components/Header'
import { HeaderRoot } from '@/components/Header/HeaderRoot'
import SideBar from '@/components/my-account/Sidebar'
import { HiHome } from 'react-icons/hi'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import CarDetail from './components/CarDetail'

type IPageProps = {
  params: {
    carId: string
  }
}

const CarId = ({ params }: IPageProps) => {
  return (
    <div className={`bg-neutral-100`}>
      <HeaderRoot>
        <Header.Logo href="/" urlLogo="/images/logo.png" />
        <ContainerSession />
      </HeaderRoot>

      <div className="w-full border-b-[1px] shadow-sm">
        <Container>
          <div className="flex w-full flex-row items-center justify-between"></div>
        </Container>
      </div>

      <Breadcrumb>
        <ItemBreadcrumbLink href="/" title="Início" icon={HiHome} />
        <ItemBreadcrumb title="viaturas" icon={MdOutlineKeyboardArrowRight} />
      </Breadcrumb>

      <Container>
        <div className="my-10 flex flex-col gap-4 lg:flex-row">
          <div className="max-w-xs flex-[1] bg-white p-[12px]">
            <h3 className="text-lg font-semibold">Menu</h3>
            <div className="mt-4">
              <SideBar />
            </div>
          </div>
          <CarDetail params={params} />
        </div>
      </Container>

      <CookiesWithDismiss />
      <Footer />
    </div>
  )
}

export default CarId
