import { APP_ROUTES } from '../app-routes/app-routes'

type IPropsRoles = {
  name: string
  roles: string[]
}

export const getRolesRoute = (asPath: string) => {
  const appPrivateRoutes = Object.values(APP_ROUTES.private)

  const routes = appPrivateRoutes.find(
    (route) => route.name === asPath,
  ) as unknown as IPropsRoles

  return routes && routes?.roles ? routes.roles : []
}
