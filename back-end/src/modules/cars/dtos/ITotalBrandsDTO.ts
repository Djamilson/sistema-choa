import { Brand } from '../infra/typeprisma/entities/Brand';

export default interface ITotalBrandsDTO {
  result: Brand[];
  total: number;
}
