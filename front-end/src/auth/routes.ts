// rutas que necesitan autenticacion
export const protectedRoutes = [
  '/serverPage',
  '/middlewareProtected',
  '/checkout',
  '/admin',
]

export const publicRoutes = [
  '/',
  '/signin',
  '/signup',
  '/politic',
  '/exchanges-and-returns',
  '/privacy-policy',
  '/basket',
  '/contact',
  '/product-detail',
  '/selected-guarantee',
  '/clientNotLogadPage',
  '/register',
  '/home',
]

// ruta que necesitan autenticacion y rol de "ADMIN"
export const adminRoutes = ['/admin']

// rutas para realizar la autenticacion
// export const authRoutes = ['/login', '/signup', '/register']
export const authRoutes = ['/signin', '/signup', '/register']

// ruta a la API para procesos de autenticacion
export const apiAuthPrefix = '/api/auth'

// ruta por defecto a la que se redirecciona luego de hacer un login
export const DEFAULT_LOGIN_REDIRECT = '/'
