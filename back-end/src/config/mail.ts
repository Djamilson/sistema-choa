interface IMailConfig {
  driver: 'ethereal' | 'ses' | 'resend'
  defaults: {
    from: {
      email: string
      name: string
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: process.env.MAIL_BASE_FROM,
      name: process.env.COMPANY_NAME,
    },
  },
} as IMailConfig
