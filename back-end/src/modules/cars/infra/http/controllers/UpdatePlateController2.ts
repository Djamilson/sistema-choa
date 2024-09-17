import { UpdatePlateService } from '@modules/cars/services/UpdatePlateService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class UpdatePlateController {
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { carId } = req.params
      const { plate } = req.body

      const updatePlateService = container.resolve(UpdatePlateService)

      const newCar = await updatePlateService.execute({
        carId,
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

export { UpdatePlateController }
