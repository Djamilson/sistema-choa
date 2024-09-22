import { ListCarsPaginationService } from '@modules/cars/services/ListCarsPaginationService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class ListCarsPaginationController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const { page, limit, q } = req.query
      const pageSize = limit

      const query = `${q || ''}` // string de consulta

      const list = container.resolve(ListCarsPaginationService)

      console.log('EStou reeee chegou aqui: porrooo', req.query)
      const meProducts = await list.execute({
        page: Number(page),
        pageSize: Number(pageSize),
        query,
      })
      console.log('EStou reeee', meProducts)
      return res.json(meProducts)
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode })
    }
  }
}

export { ListCarsPaginationController }
