import { ensureAuthenticated } from '@modules/users/infra/http/middleware/ensureAuthenticanted'
import { Router } from 'express'

const cachesRouter = Router()

cachesRouter.use(ensureAuthenticated)

// => /caches

export default cachesRouter
