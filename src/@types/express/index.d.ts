import { IUser } from "../../common/interfaces/user.interface";

declare namespace Express {
  export interface Request {
    user: IUser
  }
}