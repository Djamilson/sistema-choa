import CollaboratorsPaginationByCpfOrNameService from '@modules/users/services/CollaboratorsPaginationByCpfOrNameService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CollaboratorsPaginationByCpfOrNameController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { page, limit, q, labelSearch } = req.query;
    const pageSize = limit;

    const query = `${q || ''}`; // string de consulta

    const list = container.resolve(CollaboratorsPaginationByCpfOrNameService);

    const meProducts = await list.execute({
      page: Number(page),
      pageSize: Number(pageSize),
      query,
      labelSearch: String(labelSearch),
    });

    return res.json(meProducts);
  }
}

export { CollaboratorsPaginationByCpfOrNameController };
