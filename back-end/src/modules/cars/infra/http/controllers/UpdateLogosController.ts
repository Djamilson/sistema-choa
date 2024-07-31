import { UpdateLogoService } from '@modules/brands/services/UpdateLogoService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class UpdateLogosController {
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { brandId } = req.params
      console.log('==>req.file', req.file)

      const updateLogoService = container.resolve(UpdateLogoService)

      const upDateBrand = await updateLogoService.execute({
        brandId,
        logoFilename: req.file!.filename,
      })

      return res.status(202).json(upDateBrand)
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}

export { UpdateLogosController }
