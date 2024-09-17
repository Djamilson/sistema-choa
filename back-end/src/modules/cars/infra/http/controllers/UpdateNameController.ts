import { UpdateNameService } from '@modules/cars/services/UpdateNameService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class UpdateNameController {
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { carId } = req.params
      const { name } = req.body

      const updateNameService = container.resolve(UpdateNameService)

      const newCar = await updateNameService.execute({
        carId,
        name,
      })

      return res.json(newCar)
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}

export { UpdateNameController }
