export type IImageBanner = {
  id: string
  name: string
  position: number
  status: boolean
  banner_id: string
  image_banner_url: string
}

export type IBanner = {
  id: string
  name: string
  type: string
  publisher: boolean
  images_banners: IImageBanner[]
}
