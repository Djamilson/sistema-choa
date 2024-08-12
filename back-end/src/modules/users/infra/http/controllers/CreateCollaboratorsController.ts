import { CreateCollaboratorsService } from '@modules/_auth/registerUser/services/CreateCollaboratorService';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CreateCollaboratorsController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const {companyId} = req.params;
      const {
        name,
        email,
        phone,
        password,
        birth_date,
        cpf,
        nameGroup,
        zip_code,
        street,
        number,
        complement,
        neighborhood,
        state,
        city,
      } = req.body;
      console.log('req.body:', req.body);
      console.log('req.params:', req.params);

      const createCollaboratorsService = container.resolve(
        CreateCollaboratorsService,
      );

      const user = await createCollaboratorsService.execute({
        company_id: companyId,
        nameGroup,
        user: { password },
        person: {
          name,
          email,
          phone,
          birth_date,
          cpf,
        },
        address: {
          zip_code,
          street,
          number,
          complement,
          neighborhood,
          state,
          city,
        },
      });

      return res.json(instanceToPlain(user));
    } catch (error: any) {

      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}

export { CreateCollaboratorsController };
