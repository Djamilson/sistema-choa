import { removeParamsForAsPath } from '@/utils/asPathIsParams'
import { APP_ROUTES } from '../app-routes/app-routes'

export const checkIsPublicRoute = (asPath: string) => {
  const asPathIsParams = removeParamsForAsPath(asPath)

  const appPublicRoutes = Object.values(APP_ROUTES.public)

  return appPublicRoutes.includes(asPathIsParams)
}
