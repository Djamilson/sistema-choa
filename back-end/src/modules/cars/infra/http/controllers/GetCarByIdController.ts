import { GetCarByIdService } from '@modules/cars/services/GetCarByIdService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class GetCarByIdController {
  async show(request: Request, response: Response): Promise<Response> {
    const { carId } = request.params
    const getCarByIdService = container.resolve(GetCarByIdService)

    const car = await getCarByIdService.execute({ carId })

    return response.status(200).json(car)
  }
}

export { GetCarByIdController }
