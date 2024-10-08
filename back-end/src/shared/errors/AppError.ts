class AppError {
  public readonly message: string;

  public readonly statusCode?: number;

  constructor(message: any, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
