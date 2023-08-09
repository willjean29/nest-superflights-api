import { Document } from "mongoose";
import { UserRoles } from "../enum/roles.enum";

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  roles: UserRoles[];
}