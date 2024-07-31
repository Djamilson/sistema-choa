import { GetUserByUserIdAndCompanyIdDashboardLoggedService } from '@modules/users/services/GetUserByUserIdAndCompanyIdDashboardLoggedService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class GetUserByUserIdAndCompanyIdDashboardLoggedController {
  public async show(req: Request, res: Response): Promise<Response> {
    try {
      const { userId, companyId } = req.params;
      console.log('pppsdofpoapso:', req.params);
      const getUserByUserIdAndCompanyIdDashboardLoggedService =
        container.resolve(GetUserByUserIdAndCompanyIdDashboardLoggedService);

      const user =
        await getUserByUserIdAndCompanyIdDashboardLoggedService.execute({
          user_id: userId,
          company_id: companyId,
        });

      return res.status(200).json(user);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}

export { GetUserByUserIdAndCompanyIdDashboardLoggedController };
