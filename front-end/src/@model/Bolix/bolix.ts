export type IBolix = {
  method: string
  created_at: string
  message: string
  banking_billet: {
    barcode: string
    pix: {
      qrcode: string
      qrcode_image: string
    }
    link: string
    billet_link: string
    pdf: {
      charge: string
    }
    expire_at: string
    configurations: {
      interest: number
      fine: number
    }
  }
}
