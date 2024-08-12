export function getStatusOrderOnProduct(type: string): string {
  // AWAITING  @map("awaiting") //aguardando
  // PROCESSED @map("processed") //processado
  // CANCELED  @map("canceled") //cancelado

  const helpers: { [key: string]: string } = {
    AWAITING: 'aguardando',
    CANCELED: 'cancelado',
  }

  const type1: string = helpers[type] || 'processado'

  return type1
}
