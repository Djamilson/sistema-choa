import { Breadcrumb } from '@/components/Breadcrumb'
import { ItemBreadcrumb } from '@/components/Breadcrumb/ItemBreadcrumb'
import { ItemBreadcrumbLink } from '@/components/Breadcrumb/ItemBreadcrumbLink'
import Container from '@/components/Container'
import ContainerSession from '@/components/ContainerSession'
import Footer from '@/components/Footer'
import { Header } from '@/components/Header'
import { HeaderRoot } from '@/components/Header/HeaderRoot'
import { HeaderTitle } from '@/components/Header/HeaderTitle'
import { SideBarNavMenuCategory } from '@/components/MenuCategory/SideBarNavMenuCategory'
import { SideBarNavMenuInfoEcommerce } from '@/components/MenuInfoEcommerce/SideBarNavMenuInfoEcommerce'
import CategoryMenuHamburger from '@/components/navbar/CategoryMenuHamburger'

import { HiHome } from 'react-icons/hi'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import ProductDetail from './components/ProductDetail'

type IPageProps = {
  params: {
    aggregationProductId: string
    productId: string
  }
}

const ProductDetails = ({ params }: IPageProps) => {
  return (
    <div className="w-full bg-neutral-100">
      <>
        <HeaderTitle />
        <HeaderRoot>
          <Header.Logo href="/" urlLogo="/images/logo.png" />
          <ContainerSession />
        </HeaderRoot>

        <SideBarNavMenuInfoEcommerce />
        <div className="w-full border-b-[1px] shadow-sm">
          <Container>
            <div className="flex w-full flex-row items-center justify-between">
              <CategoryMenuHamburger />
              <div className="hidden flex-row md:block">
                <SideBarNavMenuCategory />
              </div>
            </div>
          </Container>
        </div>
      </>

      <Breadcrumb>
        <ItemBreadcrumbLink href="/" title="Início" icon={HiHome} />
        <ItemBreadcrumb
          title="descrição do produto"
          icon={MdOutlineKeyboardArrowRight}
        />
      </Breadcrumb>

      <ProductDetail params={params} />

      <section className="py-100">
        <Footer />
      </section>
    </div>
  )
}

export default ProductDetails
