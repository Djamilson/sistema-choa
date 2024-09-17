import { Exclude, Expose } from 'class-transformer'

import uploadConfig from '@config/upload'

class Brand {
  id: string
  name: string

  logo?: string

  @Exclude()
  created_at: Date

  @Exclude()
  updated_at: Date

  @Expose({ name: 'logo_url' })
  getLogoUrl(): string | null {
    if (!this.logo) {
      return null
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `http://${process.env.APP_URL_BACKEND}:${process.env.API_PORT}/files/${this.logo}`
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.logo}`
      default:
        return null
    }
  }
}

export { Brand }
