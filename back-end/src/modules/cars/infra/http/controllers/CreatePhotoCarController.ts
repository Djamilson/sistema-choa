import { CreatePhotoCarService } from '@modules/cars/services/CreatePhotoCarService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class CreatePhotoCarController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const createPhotoProduct = container.resolve(CreatePhotoCarService)

      const { carId } = req.body

      const photoProduct = await createPhotoProduct.execute({
        carId,
        photoFilename: (req?.file && req.file.filename) || '',
      })

      return res.json(photoProduct)
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}

export { CreatePhotoCarController }
