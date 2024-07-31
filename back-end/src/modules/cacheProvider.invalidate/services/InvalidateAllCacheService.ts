import { InvalidateCacheAllUserByUserIdDashboardLoggedPrefixoService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheAllUserByUserIdDashboardLoggedPrefixoService'
import { InvalidateCacheAllUsersByEmailColaboratorLoggedPrefixService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheAllUsersByEmailColaboratorLoggedPrefixService'
import { InvalidateCacheAllUsersByEmailDashboardLoggedPrefixService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheAllUsersByEmailDashboardLoggedPrefixService'
import { InvalidateCacheAllUsersByPrefixUserService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheAllUsersByPrefixUserService'
import { InvalidateCacheAllUsersByUserIdAndCompanyIdDashboardLoggedPrefixService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheAllUsersByUserIdAndCompanyIdDashboardLoggedPrefixService'
import { InvalidateCacheAllUsersByUserIdColaboratorLoggedPrefixService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheAllUsersByUserIdColaboratorLoggedPrefixService'
import { InvalidateCacheAllUsersReviewsByPrefixUserService } from '@modules/cacheProvider.invalidate/services/InvalidateCacheAllUsersReviewsByPrefixUserService'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import AppError from '@shared/errors/AppError'
import { container, inject, injectable } from 'tsyringe'

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

      const invalidateCacheAllUsersByPrefixUserService = container.resolve(
        InvalidateCacheAllUsersByPrefixUserService,
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

      const invalidateCacheAllUsersReviewsByPrefixUserService =
        container.resolve(InvalidateCacheAllUsersReviewsByPrefixUserService)

      const invalidateCacheAllUserByUserIdDashboardLoggedPrefixoService =
        container.resolve(
          InvalidateCacheAllUserByUserIdDashboardLoggedPrefixoService,
        )

      const cachekeyUnitMeasurement = `unitMeasurement`

      await Promise.all([
        this.cacheProvider.invalidatePrefix(cachekeyUnitMeasurement),
        this.cacheProvider.invalidatePrefix(
          cachekeyGetAggregationProductMeDetailsByAggregationProductId,
        ),
        invalidateCacheAllUsersReviewsByPrefixUserService.execute(),
        invalidateCacheAllUsersByEmailColaboratorLoggedPrefixService.execute(),
        invalidateCacheAllUsersByEmailDashboardLoggedPrefixService.execute(),
        invalidateCacheAllUsersByPrefixUserService.execute(),
        invalidateCacheAllUsersByUserIdAndCompanyIdDashboardLoggedPrefixService.execute(),
        invalidateCacheAllUsersByUserIdColaboratorLoggedPrefixService.execute(),
        invalidateCacheAllUserByUserIdDashboardLoggedPrefixoService.execute(),
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
        this.cacheProvider.invalidatePrefix(
          cachekeyAggregationsProductsEcommerceSearch,
        ),
        this.cacheProvider.invalidatePrefix(cachekeyProducts),
        this.cacheProvider.invalidatePrefix(
          cachekeyAggregationsProductsByCategoryId,
        ),
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
