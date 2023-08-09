import { IUser } from './user.interface';
export interface IUserSession {
  user: IUser,
  token: string
}