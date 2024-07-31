import { CreateBrandService } from '@modules/brands/services/CreateBrandService'
import { GetBrandByIdService } from '@modules/brands/services/GetBrandByIdService'
import { ListAllBrandService } from '@modules/brands/services/ListAllBrandService'
import { UpdateNameBrandService } from '@modules/brands/services/UpdateNameBrandService'
import { instanceToPlain } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class BrandsController {
  async show(request: Request, response: Response): Promise<Response> {
    const getBrandById = container.resolve(GetBrandByIdService)

    const brand_id = request.params.brandId

    const brand = await getBrandById.execute({ brandId: brand_id })

    return response.status(200).json(brand)
  }

  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const list = container.resolve(ListAllBrandService)

      const brands = await list.execute()
      return res.json(instanceToPlain(brands))
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.body

      const createBrand = container.resolve(CreateBrandService)

      const newBrand = await createBrand.execute({
        name,
      })

      return res.json(instanceToPlain(newBrand))
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { brandId } = req.params
      const { name } = req.body

      const updateNameBrand = container.resolve(UpdateNameBrandService)

      const newBrand = await updateNameBrand.execute({
        brandId,
        name,
      })

      return res.json(newBrand)
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}

export { BrandsController }
