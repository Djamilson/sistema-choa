import { GetUserByUserIdService } from '@modules/users/services/GetUserByUserIdService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class GetUserByUserIdController {
  public async show(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;

      const getUserByUserIdService = container.resolve(GetUserByUserIdService);

      const user = await getUserByUserIdService.execute({
        user_id: userId,
      });

      return res.status(200).json(user);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}

export { GetUserByUserIdController };
