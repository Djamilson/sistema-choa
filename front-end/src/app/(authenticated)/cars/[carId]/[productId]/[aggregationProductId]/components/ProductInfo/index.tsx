import { IDataSheet } from '@/@model/product/IDataSheet'
import { IProductEcommerce } from '@/@model/product/product'
import { Accordion } from '@/components/Accordion'
import { Datasheet } from '@/components/Datasheet'
import ListingVideo from '@/components/listings/ListingVideo'
import { LinkEvaluateProduct } from '@/components/product-detail/LinkEvaluateProduct'
import { MessageNoReviewOrNoQuestion } from '@/components/product-detail/MessageNoReviewOrNoQuestion'
import { ProductQuestions } from '@/components/product-detail/question/ProductQuestions'
import { ProductReviews } from '@/components/product-detail/review/ProductReviews'
import { ProductInformation } from '@/components/ProductInformation'
import ComplementProductInformation from '../ComplementProductInformation'
import ListingQuestion from '../ListingQuestion'
import ListingReview from '../ListingReview'

type IProductInfo = {
  productId: string
  aggregationProductId: string
  initialProduct: IProductEcommerce
  dataSheets: IDataSheet[]
}

const ProductInfo = ({
  productId,
  aggregationProductId,
  initialProduct,
  dataSheets,
}: IProductInfo) => {
  return (
    <div id="detailProduct" className="mb-6 md:my-20">
      {initialProduct && (
        <ProductInformation
          title="Informações do produto"
          complementProductInformation={<ComplementProductInformation />}
        >
          <div className="p-2"> {initialProduct?.description} </div>
        </ProductInformation>
      )}
      {dataSheets && (
        <Datasheet title="Ficha técnica" dataSheets={dataSheets} />
      )}
      <ProductReviews
        title="avaliações"
        productId={productId}
        aggregationProductId={aggregationProductId}
      >
        <ListingReview aggregationProductId={aggregationProductId}>
          <MessageNoReviewOrNoQuestion
            title={`esse produto ainda não tem comentários`}
            subTitle={`seja o primeiro a avaliar esse produto :)`}
          >
            <LinkEvaluateProduct
              href={`/reviews/${productId}/${aggregationProductId}`}
              title="avaliar produto"
            />
          </MessageNoReviewOrNoQuestion>
        </ListingReview>
      </ProductReviews>
      <ProductQuestions
        title="dúvidas sobre o produto"
        productId={productId}
        aggregationProductId={aggregationProductId}
      >
        <ListingQuestion aggregationProductId={aggregationProductId}>
          <MessageNoReviewOrNoQuestion
            title={`esse produto ainda não tem pergunta`}
            subTitle={`seja o primeiro a fazer uma pergunta :)`}
          >
            <LinkEvaluateProduct
              href={`/questions/${productId}/${aggregationProductId}`}
              title="escrever pergunta"
            />
          </MessageNoReviewOrNoQuestion>
        </ListingQuestion>
      </ProductQuestions>
      <Accordion title={`Play do video`}>
        <div className="mt-2 flex flex-col gap-[4px]">
          <ListingVideo productId={productId}>
            <MessageNoReviewOrNoQuestion
              title={`esse produto ainda não tem vídeo cadastrado`}
              subTitle={`tão logo cadastraresmos vídeos novos :)`}
            >
              <></>
            </MessageNoReviewOrNoQuestion>
          </ListingVideo>
        </div>
      </Accordion>
    </div>
  )
}

export default ProductInfo
