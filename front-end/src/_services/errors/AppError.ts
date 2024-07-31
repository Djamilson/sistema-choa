export type IPropsError = {
  message: string
  statusCode?: number
}

class AppError {
  public readonly message: any
  public readonly statusCode?: number

  constructor(message: any, statusCode?: number) {
    this.message = message
    this.statusCode = statusCode
  }
}

export { AppError }
