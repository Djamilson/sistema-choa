import mercadoPagoRouter from '@gateway-payment/mercadopago/infra/http/routes/mercadopago.routes'
import oauthAccountsRouter from '@modules/_auth/account/infra/http/routes/oauth.accounts.routes'
import oauthGooglesRouter from '@modules/_auth/googleOAuthToken/infra/http/routes/googles.oauth.routes'
import registerUserRouter from '@modules/_auth/registerUser/infra/http/routes/registers.users.collaboretors'
import oauthSessionsRouter from '@modules/_auth/sessionOAuth/infra/http/routes/oauth.sessions.routes'
import { questionAnswersRouter } from '@modules/aggregationsProducts/_questions/_answers/infra/http/routes/questions.answers.routes'
import questionsAvaliationsRouter from '@modules/aggregationsProducts/_questions/_questionsAvaliantions/infra/http/routes/questions.avaliations.routes'
import questionsRouter from '@modules/aggregationsProducts/_questions/infra/http/routes/questions.routes'
import reviewsAvaliationsRouter from '@modules/aggregationsProducts/_reviews/_reviewsAvaliantions/infra/http/routes/reviews.avaliations.routes'
import wordsRouter from '@modules/aggregationsProducts/_reviews/_words/infra/http/routes/words.routes'
import { reviewsRouter } from '@modules/aggregationsProducts/_reviews/infra/http/routes/reviews.routes'
import datasheetsRouter from '@modules/aggregationsProducts/dataSheets/infra/http/routes/datasheets.routes'
import { aggregationsProductsRouter } from '@modules/aggregationsProducts/infra/http/routes/aggregations.products.routes'
import bannersRouter from '@modules/banners/infra/http/routes/banners.routes'
import { brandsRouter } from '@modules/brands/infra/http/routes/brands.routes'
import cachesRouter from '@modules/cacheProvider.invalidate/infra/http/routes/caches.routes'
import categoriesRouter from '@modules/categories/infra/http/routes/categories.routes'
import { colorsProductsRouter } from '@modules/colorsProducts/infra/http/routes/colors.products.routes'
import pageAccessesCounterRouter from '@modules/countsClicks/pageAccessesCounter/infra/http/routes/page.accesses.counter.routes'
import { createVideosRouter } from '@modules/createVideo/infra/http/routes/criate.videos.routes'
import { dimensionsProductsRouter } from '@modules/dimensionsProducts/infra/http/routes/dimensions.products.routes'
import { dashBoardForgottenCartsRouter } from '@modules/forgottenCarts/infra/http/routes/dashboard.forgotten.carts.routes'
import { forgottenCartsRouter } from '@modules/forgottenCarts/infra/http/routes/forgotten.carts.routes'
import { freightsRouter } from '@modules/freights/infra/http/routes/freights.routes'
import { guaranteesRouter } from '@modules/guarantees/infra/http/routes/guarantes.routes'
import { consumersUsersRouter } from '@modules/kafka/infra/http/router/consumers.users.routes'
import { notificationsWhenInStocksRouter } from '@modules/notificationsWhenInStocks/infra/http/routes/notifications.when.in.stocks.routes'
import { dashBoardsOrdersRouter } from '@modules/orders/infra/http/routes/dashboards.orders.routes'
import { ordersRouter } from '@modules/orders/infra/http/routes/orders.routes'
import { ordersOnCanceledRouter } from '@modules/ordersOnCanceled/infra/http/routes/orders.on.canceled.routes'
import { documentsRouter } from '@modules/paymentCollaboratores/_documents/infra/http/routes/documents.routes'
import { paymentsCollaboratorsRouter } from '@modules/paymentCollaboratores/infra/http/routes/payments.collaborators.routes'
import { gerencianetPixRouter } from '@modules/payments/gerencianet/infra/http/routes/gerencianet.pix.routes'
import { webHookGerencianetPixRouter } from '@modules/payments/gerencianet/infra/http/routes/webhook.gerencianet.pix.routes'
import politicsRouter from '@modules/politics/infra/http/routes/politics.routes'
import politicSummaryRouter from '@modules/politicsSummaries/infra/http/routes/politics.summaries.routes'
import politicSummaryItemRouter from '@modules/politicsSummariesItems/infra/http/routes/politics.summaries.items.routes'
import pricesRouter from '@modules/prices/infra/http/routes/prices.routes'
import productsMeDetailsRouter from '@modules/products/infra/http/routes/products.me.detail.routes'
import productsRouter from '@modules/products/infra/http/routes/products.routes'
import productsInfoRouter from '@modules/productsInfo/infra/http/routes/productsInfo.routes'
import { providersRouter } from '@modules/provider/infra/http/routes/providers.routes'
import addressesRouter from '@modules/receivers/infra/http/routes/addresses.routes'
import { receiversRouter } from '@modules/receivers/infra/http/routes/receivers.routes'
import { refreshTokenRouter } from '@modules/refreshesTokens/infra/http/routes/refresh.token.routes'
import { sessionsRouter } from '@modules/sessions/infra/http/routes/sessions.routes'
import { sizesProductsRouter } from '@modules/sizesProducts/infra/http/routes/sizes.products.routes'
import { stocksRouter } from '@modules/stocks/infra/http/routes/stocks.routes'
import subCategoriesRouter from '@modules/subcategories/infra/http/routes/subCategories.routes'
import { titlesEcommerceRouter } from '@modules/titlesEcommerce/infra/http/routes/titles.ecommerce.routes'
import { transactionsBolixsRouter } from '@modules/transactions/gerencianet/bolixs/infra/http/routes/transactions.bolixs.routes'
import { transactionsPixsRouter } from '@modules/transactions/gerencianet/pixs/infra/http/routes/transactions.pixs.routes'
import { transactionsCardsRouter } from '@modules/transactions/pagarme/cards/infra/http/routes/transactions.cards.routes'
import { typesProductsRouter } from '@modules/typesProducts/infra/http/routes/types.products.routes'
import { unitsMeasurementsRouter } from '@modules/unitsMeasurements/infra/http/routes/unit.measurement.routes'
import { collaboratorsRouter } from '@modules/users/infra/http/routes/collaborators.routes'
import { profileRouter } from '@modules/users/infra/http/routes/persons.routes'
import { phonesRouter } from '@modules/users/infra/http/routes/phones.routes'
import { usersRouter } from '@modules/users/infra/http/routes/users.routes'
import { videosRouter } from '@modules/videos/infra/http/routes/videos.routes'
import { voltagesProductsRouter } from '@modules/voltagesProducts/infra/http/routes/voltages.products.routes'
import { Router } from 'express'

const routes = Router()

routes.use('/users', usersRouter)
// routes.use('/kafkas/users', kafkasUsersRouter);

routes.use('/sessions', sessionsRouter)
routes.use('/titles', titlesEcommerceRouter)
routes.use('/create/videos', createVideosRouter)

routes.use('/refresh', refreshTokenRouter)
routes.use('/users', usersRouter)
routes.use('/collaborators', collaboratorsRouter)
routes.use('/phones', phonesRouter)
routes.use('/consumers', consumersUsersRouter)
routes.use('/persons', profileRouter)

routes.use('/categories', categoriesRouter)
routes.use('/subcategories', subCategoriesRouter)
routes.use('/banners', bannersRouter)

routes.use('/products', productsRouter)
routes.use('/me/products', productsMeDetailsRouter)
routes.use('/stocks', stocksRouter)
routes.use('/products/info', productsInfoRouter)
routes.use('/prices', pricesRouter)
routes.use('/politics', politicsRouter)
routes.use('/summaries/politics', politicSummaryRouter)
routes.use('/summaries/politics/items', politicSummaryItemRouter)
routes.use('/orders', ordersRouter)
routes.use('/dashboards/orders', dashBoardsOrdersRouter)
routes.use('/orders/canceled', ordersOnCanceledRouter)
routes.use('/payments/collaborators', paymentsCollaboratorsRouter)
routes.use('/documents', documentsRouter)
routes.use('/process_payment', mercadoPagoRouter)

routes.use('/transactions/pixs', transactionsPixsRouter)
routes.use('/transactions/cards', transactionsCardsRouter)
routes.use('/transactions/bolixs', transactionsBolixsRouter)

// '/webhook(/pix)?'
routes.use('/webhook', webHookGerencianetPixRouter)
routes.use('/gerencianet', gerencianetPixRouter)
routes.use('/freights', freightsRouter)

routes.use('/pages/accesses/counter', pageAccessesCounterRouter)

routes.use('/forgotten/carts', forgottenCartsRouter)
routes.use('/dashboards/forgotten/carts', dashBoardForgottenCartsRouter)
routes.use('/datasheets', datasheetsRouter)
routes.use('/videos', videosRouter)

routes.use('/questions', questionsRouter)
routes.use('/questions/answers', questionAnswersRouter)
routes.use('/questions/answers/avaliations', questionsAvaliationsRouter)
routes.use('/words', wordsRouter)
routes.use('/addresses', addressesRouter)
routes.use('/reviews', reviewsRouter)
routes.use('/reviews/avaliations', reviewsAvaliationsRouter)

routes.use('/providers', providersRouter)
routes.use('/brands', brandsRouter)
routes.use('/types/products', typesProductsRouter)
routes.use('/colors/products', colorsProductsRouter)
routes.use('/sizes/products', sizesProductsRouter)
routes.use('/voltages/products', voltagesProductsRouter)
routes.use('/dimensions/products', dimensionsProductsRouter)
routes.use('/aggregations/products', aggregationsProductsRouter)
routes.use('/units/measurements', unitsMeasurementsRouter)
routes.use('/notifications/when/in/stocks', notificationsWhenInStocksRouter)
routes.use('/guarantees', guaranteesRouter)
routes.use('/receivers', receiversRouter)

routes.use('/caches', cachesRouter)

// OAUTH
routes.use('/registers', registerUserRouter)
routes.use('/oauth/sessions', oauthSessionsRouter)
routes.use('/oauth/accounts', oauthAccountsRouter)
routes.use('/oauth/providers', oauthGooglesRouter)

export default routes
