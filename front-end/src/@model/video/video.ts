interface IVideo {
  id: string
  created_at: Date
  title: string
  description: string
  thumbnail_image: string
  thumbnail_image_url: string
  video_url: string
  status: boolean
  publisher: boolean
  product_id: string
}

export type { IVideo }
