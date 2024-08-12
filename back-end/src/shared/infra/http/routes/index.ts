import oauthAccountsRouter from '@modules/_auth/account/infra/http/routes/oauth.accounts.routes'
import oauthGooglesRouter from '@modules/_auth/googleOAuthToken/infra/http/routes/googles.oauth.routes'
import registerUserRouter from '@modules/_auth/registerUser/infra/http/routes/registers.users.collaboretors'
import oauthSessionsRouter from '@modules/_auth/sessionOAuth/infra/http/routes/oauth.sessions.routes'
import cachesRouter from '@modules/cacheProvider.invalidate/infra/http/routes/caches.routes'
import { carsRouter } from '@modules/cars/infra/http/routes/cars.routes'
import { refreshTokenRouter } from '@modules/refreshesTokens/infra/http/routes/refresh.token.routes'
import { sessionsRouter } from '@modules/sessions/infra/http/routes/sessions.routes'
import { collaboratorsRouter } from '@modules/users/infra/http/routes/collaborators.routes'
import { profileRouter } from '@modules/users/infra/http/routes/persons.routes'
import { phonesRouter } from '@modules/users/infra/http/routes/phones.routes'
import { usersRouter } from '@modules/users/infra/http/routes/users.routes'

import { Router } from 'express'

const routes = Router()

routes.use('/users', usersRouter)
// routes.use('/kafkas/users', kafkasUsersRouter);

routes.use('/sessions', sessionsRouter)

routes.use('/refresh', refreshTokenRouter)
routes.use('/users', usersRouter)
routes.use('/collaborators', collaboratorsRouter)
routes.use('/phones', phonesRouter)
routes.use('/persons', profileRouter)

routes.use('/caches', cachesRouter)

routes.use('/cars', carsRouter)

// OAUTH
routes.use('/registers', registerUserRouter)
routes.use('/oauth/sessions', oauthSessionsRouter)
routes.use('/oauth/accounts', oauthAccountsRouter)
routes.use('/oauth/providers', oauthGooglesRouter)

export default routes
