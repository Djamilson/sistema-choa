import { UpdateAcronymService } from '@modules/cars/services/UpdateAcronymService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class UpdateAcronymController {
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { carId } = req.params
      const { acronym } = req.body

      const updateAcronymService = container.resolve(UpdateAcronymService)

      const newCar = await updateAcronymService.execute({
        carId,
        acronym,
      })

      return res.json(newCar)
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}

export { UpdateAcronymController }
