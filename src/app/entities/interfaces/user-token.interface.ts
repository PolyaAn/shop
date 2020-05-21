import {User} from './user.interface';

export interface UserToken {
  customer: User;
  token: string;
}
