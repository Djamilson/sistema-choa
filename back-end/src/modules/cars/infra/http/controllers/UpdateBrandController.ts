import { UpdateBrandService } from '@modules/cars/services/UpdateBrandService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class UpdateBrandController {
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { carId } = req.params
      const { brand } = req.body

      const updateBrandService = container.resolve(UpdateBrandService)

      const newCar = await updateBrandService.execute({
        carId,
        brand,
      })

      return res.json(newCar)
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}

export { UpdateBrandController }
