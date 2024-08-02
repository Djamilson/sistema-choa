import { CreateCarService } from '@modules/cars/services/CreateCarService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class CreateCarController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, acronym, brand, description, fuel_type, plate } = req.body

      const createCarService = container.resolve(CreateCarService)

      const newCar = await createCarService.execute({
        name,
        acronym,
        brand,
        description,
        fuel_type,
        plate,
      })

      return res.json(newCar)
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}

export { CreateCarController }
