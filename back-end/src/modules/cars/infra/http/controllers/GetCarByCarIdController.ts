import { GetCarByCarIdService } from '@modules/cars/services/GetCarByCarIdService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class GetCarByCarIdController {
  async show(request: Request, response: Response): Promise<Response> {
    try {
      const { carId } = request.params
      const getCarByCarIdService = container.resolve(GetCarByCarIdService)

      const car = await getCarByCarIdService.execute({ carId })

      return response.status(200).json(car)
    } catch (error: any) {
      return response
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}

export { GetCarByCarIdController }
