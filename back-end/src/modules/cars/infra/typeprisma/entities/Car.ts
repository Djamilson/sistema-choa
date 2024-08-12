import uploadConfig from '@config/upload'
import { Expose } from 'class-transformer'
import {
  Maintenance,
  Problem,
} from '../../../../../../prisma/generated/postgres'
import { Photo } from './Photo'

class Car {
  id: string
  name: string
  description: string
  acronym: string
  brand: string
  plate: string
  fuel_type: string

  maintenances: Maintenance[]
  problems: Problem[]
  photos?: Photo[]

  created_at: Date
  updated_at: Date

  @Expose({ name: 'thumbnail_url' })
  getThumbnailUrl(): string | null {
    if (this.photos === undefined) {
      return null
    }

    if (this.photos !== undefined && this.photos.length < 1) {
      return null
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_URL_BACKEND}:${process.env.API_PORT}/files/${this.photos[0].name}`
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.photos[0].name}`
      default:
        return null
    }
  }
}

export { Car }
