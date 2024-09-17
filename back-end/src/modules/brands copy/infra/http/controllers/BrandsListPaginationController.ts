import { ListBrandsPaginationService } from '@modules/brands/services/ListBrandsPaginationService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class BrandsListPaginationController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { page, limit, q } = req.query;
    const pageSize = limit;

    const query = `${q || ''}`; // string de consulta

    const list = container.resolve(ListBrandsPaginationService);

    const meProducts = await list.execute({
      page: Number(page),
      pageSize: Number(pageSize),
      query,
    });

    return res.json(meProducts);
  }
}

export { BrandsListPaginationController };
