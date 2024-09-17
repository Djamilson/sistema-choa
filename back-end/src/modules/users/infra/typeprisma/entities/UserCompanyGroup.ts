import { Exclude } from 'class-transformer';
import { Group } from './Group';
import User from './User';

class UserCompanyGroup {
  user: User;
  group: Group;
  company_id: string;
  group_id: string;
  user_id: string;
  status: boolean;

  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;
}

export { UserCompanyGroup };
