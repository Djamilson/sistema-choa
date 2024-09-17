import { UpdateDescriptionService } from '@modules/cars/services/UpdateDescriptionService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class UpdateDescriptionController {
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { carId } = req.params
      const { description } = req.body

      const updateDescriptionService = container.resolve(
        UpdateDescriptionService,
      )

      const newCar = await updateDescriptionService.execute({
        carId,
        description,
      })

      return res.json(newCar)
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}

export { UpdateDescriptionController }
