import { InvalidateAllCacheProviderPaginationService } from '@modules/cacheProvider.invalidate/services/InvalidateAllCacheProviderPaginationService'
import { InvalidateAllCacheStocksPageService } from '@modules/cacheProvider.invalidate/services/InvalidateAllCacheStocksPageService'
import { InvalidateAllCacheSubCategoriesPageService } from '@modules/cacheProvider.invalidate/services/InvalidateAllCacheSubCategoriesPageService'
import { InvalidateCacheAllBannerPrefixoService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheAllBannerPrefixoService'
import { InvalidateCacheAllBannersPublisherPrefixService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheAllBannersPublisherPrefixService'
import { InvalidateCacheAllBannersService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheAllBannersService'
import { InvalidateCacheAllCategoriesService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheAllCategoriesService'
import { InvalidateCacheAllPoliticsService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheAllPoliticsService'
import { InvalidateCacheAllPoliticsSummariesService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheAllPoliticsSummariesService'
import { InvalidateCacheAllProductsService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheAllProductsService'
import { InvalidateCacheAllQuestionsService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheAllQuestionsService'
import { InvalidateCacheAllUserByUserIdDashboardLoggedPrefixoService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheAllUserByUserIdDashboardLoggedPrefixoService'
import { InvalidateCacheAllUsersByEmailColaboratorLoggedPrefixService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheAllUsersByEmailColaboratorLoggedPrefixService'
import { InvalidateCacheAllUsersByEmailDashboardLoggedPrefixService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheAllUsersByEmailDashboardLoggedPrefixService'
import { InvalidateCacheAllUsersByPrefixUserService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheAllUsersByPrefixUserService'
import { InvalidateCacheAllUsersByUserIdAndCompanyIdDashboardLoggedPrefixService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheAllUsersByUserIdAndCompanyIdDashboardLoggedPrefixService'
import { InvalidateCacheAllUsersByUserIdColaboratorLoggedPrefixService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheAllUsersByUserIdColaboratorLoggedPrefixService'
import { InvalidateCacheAllUsersReviewsByPrefixUserService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheAllUsersReviewsByPrefixUserService'
import { InvalidateCacheListTitleEcommercePaginationService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheListTitleEcommercePaginationService'
import { InvalidateCacheTypesProductsPageService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheTypesProductsPageService'
import { InvalidateCachekeyAllAggregationsProductsEcommerceSearchService } from '@modules/cacheProvider.invalidate/services/InvalidateCachekeyAllAggregationsProductsEcommerceSearchService'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import AppError from '@shared/errors/AppError'
import { container, inject, injectable } from 'tsyringe'
import { InvalidateCacheAllColorPrefixoService } from './InvalidateCacheAllColorPrefixoService'
import { InvalidateCacheAllListCategoriesNotInIdsPaginationByProductIdService } from './InvalidateCacheAllListCategoriesNotInIdsPaginationByProductIdService'
import { InvalidateCacheAllReceiversService } from '../../receivers/services/caches/InvalidateCacheAllReceiversService'

@injectable()
class InvalidateAllCacheService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(): Promise<void> {
    try {
      const cachekeyBanners = `banners`
      const cachekeyCategories = `categories`
      const cachekeyProducts = `products`
      const cachekeyProduct = `product`
      const cachekeyProductMin = `productMin`
      const cachekeyQuestionAvaliation = `question-avaliant`
      const cachekeyWords = `words`
      const cachekeyReviews = `reviews`
      const cachekeyDetailReviewProduct = `detailReviewProduct`
      const cachekeyVideo = `video`
      const cachekeyVideos = `videos`
      const cachekeyAggregationsProducts = `aggregationsProducts`
      const cachekeyTypeProducts = `typeProducts`
      const cachekeySizeProducts = `sizeProducts`
      const cachekeySizeProduct = `sizeProduct`
      const cachekeyTypeProduct = `typeProduct`
      const cachekeyVoltageProducts = `voltageProducts`
      const cachekeyColorProducts = `colorProducts`
      const cachekeyColorProduct = `colorProduct`
      const cachekeyQuestions = `questions`
      const cachekeyDimension = `dimensionProduct`
      const cachekeyAggregationsProductsEcommerce = `aggregationsProductsEcommerce`
      const cachekeyAggregationsProductsEcommerceSearch = `aggregationsProductsEcommerceSearch`
      const cachekeyProductDataSheet = `dataSheet`
      const cachekeyAggregationProduct = `aggregationProduct`
      const cachekeyGetTotalStockAggregationProduct = `getTotalStockAggregationProductById`
      const cachekeyGetProductAndAggregationsByProductId = `getProductAndAggregationsByProductId`
      const cachekeyAggregationsProductsByCategoryId = `aggregationsProductsByCategoryId`
      const cachekeyListAggregationsProductsPaginationStocks = `listAggregationsProductsPaginationStocks`
      const cachekeyStocks = `stocks`
      const cachekeyGetAggregationProductMeDetailsByAggregationProductId = `getAggregationProductMeDetailsByAggregationProductId`

      const getAggregationProductMeDetailsByProductId = `getAggregationProductMeDetailsByProductId`

      const invalidateCacheAllColorPrefixoService = container.resolve(
        InvalidateCacheAllColorPrefixoService,
      )

      const invalidateCacheAllBannersService = container.resolve(
        InvalidateCacheAllBannersService,
      )

      const invalidateCacheAllReceiversService = container.resolve(InvalidateCacheAllReceiversService)

      const invalidateCacheAllListCategoriesNotInIdsPaginationByProductIdService =
        container.resolve(
          InvalidateCacheAllListCategoriesNotInIdsPaginationByProductIdService,
        )
      const invalidateCacheAllBannersPublisherPrefixService = container.resolve(
        InvalidateCacheAllBannersPublisherPrefixService,
      )
      const invalidateCachekeyAllAggregationsProductsEcommerceSearchService =
        container.resolve(
          InvalidateCachekeyAllAggregationsProductsEcommerceSearchService,
        )
      const invalidateCacheAllPoliticsSummariesService = container.resolve(
        InvalidateCacheAllPoliticsSummariesService,
      )
      const invalidateCacheListTitleEcommercePaginationService =
        container.resolve(InvalidateCacheListTitleEcommercePaginationService)
      const invalidateCacheAllBannerPrefixoService = container.resolve(
        InvalidateCacheAllBannerPrefixoService,
      )

      const invalidateAllCacheProviderPaginationService = container.resolve(
        InvalidateAllCacheProviderPaginationService,
      )

      const invalidateCacheAllUsersByPrefixUserService = container.resolve(
        InvalidateCacheAllUsersByPrefixUserService,
      )

      const invalidateCacheAllPoliticsService = container.resolve(
        InvalidateCacheAllPoliticsService,
      )
      const invalidateCacheAllQuestionsService = container.resolve(
        InvalidateCacheAllQuestionsService,
      )

      const invalidateCacheAllUsersByUserIdAndCompanyIdDashboardLoggedPrefixService =
        container.resolve(
          InvalidateCacheAllUsersByUserIdAndCompanyIdDashboardLoggedPrefixService,
        )

      const invalidateCacheAllUsersByUserIdColaboratorLoggedPrefixService =
        container.resolve(
          InvalidateCacheAllUsersByUserIdColaboratorLoggedPrefixService,
        )

      const invalidateCacheAllUsersByEmailDashboardLoggedPrefixService =
        container.resolve(
          InvalidateCacheAllUsersByEmailDashboardLoggedPrefixService,
        )

      const invalidateCacheAllUsersByEmailColaboratorLoggedPrefixService =
        container.resolve(
          InvalidateCacheAllUsersByEmailColaboratorLoggedPrefixService,
        )

      const invalidateCacheAllCategoriesService = container.resolve(
        InvalidateCacheAllCategoriesService,
      )

      const invalidateCacheAllUsersReviewsByPrefixUserService =
        container.resolve(InvalidateCacheAllUsersReviewsByPrefixUserService)

      const invalidateCacheAllUserByUserIdDashboardLoggedPrefixoService =
        container.resolve(
          InvalidateCacheAllUserByUserIdDashboardLoggedPrefixoService,
        )

      const invalidateCacheTypesProductsPageService = container.resolve(
        InvalidateCacheTypesProductsPageService,
      )

      const invalidateCacheAllProductsService = container.resolve(
        InvalidateCacheAllProductsService,
      )

      const invalidateAllCacheStocksPageService = container.resolve(
        InvalidateAllCacheStocksPageService,
      )

      const invalidateAllCacheSubCategoriesPageService = container.resolve(
        InvalidateAllCacheSubCategoriesPageService,
      )

      const cachekeyUnitMeasurement = `unitMeasurement`

      await Promise.all([
        this.cacheProvider.invalidatePrefix(cachekeyUnitMeasurement),
        this.cacheProvider.invalidatePrefix(
          cachekeyGetAggregationProductMeDetailsByAggregationProductId,
        ),
        invalidateCacheAllReceiversService.execute(),
        invalidateAllCacheStocksPageService.execute(),
        invalidateCacheAllProductsService.execute(),
        invalidateCacheTypesProductsPageService.execute(),
        invalidateCacheTypesProductsPageService.execute(),
        invalidateCacheAllPoliticsService.execute(),
        invalidateCacheAllCategoriesService.execute(),
        invalidateCacheAllUsersReviewsByPrefixUserService.execute(),
        invalidateCacheAllUsersByEmailColaboratorLoggedPrefixService.execute(),
        invalidateCacheAllUsersByEmailDashboardLoggedPrefixService.execute(),
        invalidateCacheAllUsersByPrefixUserService.execute(),
        invalidateCacheAllUsersByUserIdAndCompanyIdDashboardLoggedPrefixService.execute(),
        invalidateCacheAllUsersByUserIdColaboratorLoggedPrefixService.execute(),
        invalidateCacheAllUserByUserIdDashboardLoggedPrefixoService.execute(),
        invalidateCacheAllQuestionsService.execute(),
        invalidateAllCacheSubCategoriesPageService.execute(),
        invalidateCacheAllListCategoriesNotInIdsPaginationByProductIdService.execute(),
        invalidateCacheAllColorPrefixoService.execute(),
        this.cacheProvider.invalidatePrefix(
          cachekeyGetProductAndAggregationsByProductId,
        ),
        this.cacheProvider.invalidatePrefix(cachekeyStocks),
        this.cacheProvider.invalidatePrefix(
          getAggregationProductMeDetailsByProductId,
        ),
        this.cacheProvider.invalidatePrefix(
          cachekeyListAggregationsProductsPaginationStocks,
        ),
        this.cacheProvider.invalidatePrefix(
          cachekeyGetTotalStockAggregationProduct,
        ),
        this.cacheProvider.invalidatePrefix(
          cachekeyAggregationsProductsEcommerce,
        ),
        invalidateCacheListTitleEcommercePaginationService.execute(),
        invalidateCacheAllPoliticsSummariesService.execute(),
        invalidateCachekeyAllAggregationsProductsEcommerceSearchService.execute(),
        invalidateCacheAllBannersPublisherPrefixService.execute(),
        invalidateCacheAllBannersService.execute(),
        invalidateCacheAllBannerPrefixoService.execute(),
        this.cacheProvider.invalidatePrefix(
          cachekeyAggregationsProductsEcommerceSearch,
        ),
        this.cacheProvider.invalidatePrefix(cachekeyProducts),
        this.cacheProvider.invalidatePrefix(
          cachekeyAggregationsProductsByCategoryId,
        ),
        invalidateAllCacheProviderPaginationService.execute(),
        this.cacheProvider.invalidatePrefix(cachekeyProductDataSheet),
        this.cacheProvider.invalidatePrefix(cachekeyVideo),
        this.cacheProvider.invalidatePrefix(cachekeyProductMin),
        this.cacheProvider.invalidatePrefix(cachekeySizeProduct),
        this.cacheProvider.invalidatePrefix(cachekeyColorProduct),
        this.cacheProvider.invalidatePrefix(cachekeyAggregationProduct),
        this.cacheProvider.invalidatePrefix(cachekeyQuestionAvaliation),
        this.cacheProvider.invalidatePrefix(cachekeyBanners),
        this.cacheProvider.invalidatePrefix(cachekeyDimension),
        this.cacheProvider.invalidatePrefix(cachekeyCategories),
        this.cacheProvider.invalidatePrefix(cachekeyReviews),
        this.cacheProvider.invalidatePrefix(cachekeyDetailReviewProduct),
        this.cacheProvider.invalidatePrefix(cachekeyQuestions),
        this.cacheProvider.invalidatePrefix(cachekeyProduct),
        this.cacheProvider.invalidatePrefix(cachekeyTypeProduct),
        this.cacheProvider.invalidatePrefix(cachekeyVideos),
        this.cacheProvider.invalidate(cachekeyAggregationsProducts),
        this.cacheProvider.invalidate(cachekeyWords),
        this.cacheProvider.invalidate(cachekeyVideos),
        this.cacheProvider.invalidate(cachekeyVoltageProducts),
        this.cacheProvider.invalidate(cachekeyTypeProducts),
        this.cacheProvider.invalidate(cachekeySizeProducts),
        this.cacheProvider.invalidate(cachekeyColorProducts),
      ])
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode)
    }
  }
}

export { InvalidateAllCacheService }
