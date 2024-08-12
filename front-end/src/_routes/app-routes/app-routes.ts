export const APP_ROUTES = {
  private: {
    ecommerce: {
      name: '/home',
      roles: ['Administrador', 'Colaborador'],
    },
    dashboard: {
      name: '/dashboard',
      roles: ['Administrador', 'Colaborador'],
    },
    reviews: {
      name: '/reviews',
      roles: ['Administrador', 'Colaborador'],
    },
    my_account: {
      name: '/my-account',
      roles: ['Administrador', 'Colaborador'],
    },
    request: {
      name: '/request',
      roles: ['Administrador', 'Colaborador'],
    },
    address: {
      name: '/address',
      roles: ['Administrador', 'Colaborador'],
    },
    info_collaborator: {
      name: '/info-collaborator',
      roles: ['Administrador', 'Colaborador'],
    },
    questions: {
      name: '/questions',
      roles: ['Administrador', 'Colaborador'],
    },
    payments: {
      name: '/payments',
      roles: ['Administrador', 'Colaborador'],
    },
    success_payment: {
      name: '/success-payment',
      roles: ['Administrador', 'Colaborador'],
    },
    unauthorized: {
      name: '/unauthorized',
      roles: ['Administrador', 'Colaborador'],
    },
  },
  public: {
    home: '/',
    signin: '/signin',
    contact: '/contact',

    forget_password: '/forget-password',
    product_detail: `/product-detail`,
    selected_guarantee: '/selected-guarantee',
    politic: '/politic',
    basket: '/basket',
    exchanges_and_returns: '/exchanges-and-returns',
    privacy_policy: '/privacy-policy',
    category: '/category',
    address: '/address',
    info_collaborator: '/info-collaborator',
    request: '/request',
    _not: '/_not-found',
    my_account: '/my-account',
    payments: '/payments',
    success_payment: '/success-payment',
  },
}
