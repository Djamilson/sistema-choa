import { UpdateFuelTypeService } from '@modules/cars/services/UpdateFuelTypeService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class UpdateFuelTypeController {
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { carId } = req.params
      const { fuel_type } = req.body

      const updateFuelTypeService = container.resolve(UpdateFuelTypeService)

      const newCar = await updateFuelTypeService.execute({
        carId,
        fuel_type,
      })

      return res.json(newCar)
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}

export { UpdateFuelTypeController }
