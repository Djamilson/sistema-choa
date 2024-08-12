import RelatedSlideProducts from '@/components/CardCategory/RelatedSlideProducts'
import Container from '@/components/Container'
import { CookiesWithDismiss } from '@/components/CookiesWithDismiss'
import Footer from '@/components/Footer'
import { HeaderTitle } from '@/components/Header/HeaderTitle'
import { SideBarNavMenuInfoEcommerce } from '@/components/MenuInfoEcommerce/SideBarNavMenuInfoEcommerce'
import { MessageInformation } from '@/components/MessageInformation'
import { ServiceInformation } from '@/components/ServiceInformation'
import { ShippingInformation } from '@/components/ShippingInformation'
import { SlideBanner } from '@/components/SlideBanner'
import ListingCard from '@/components/listings/ListingCard'
import { ListingSlideCategory } from '@/components/listings/ListingSlideCategory'
import CategoryMenuHamburger from '@/components/navbar/CategoryMenuHamburger'
import { SideBarNavMenuCategory } from '@/components/MenuCategory/SideBarNavMenuCategory'

import { HeaderMY } from './Header/Header'

const Home = () => {
  return (
    <div className={`bg-neutral-100`}>
      <HeaderTitle />
      <HeaderMY />
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
      <ShippingInformation />
      <SlideBanner />
      <ServiceInformation />
      <Container>
        <ListingSlideCategory />
      </Container>
      <div className="md:pt-16">
        <MessageInformation />
      </div>
      <Container>
        <RelatedSlideProducts />
        <ListingCard />
      </Container>
      <CookiesWithDismiss />
      <Footer />
    </div>
  )
}

export default Home
