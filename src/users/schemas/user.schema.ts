import { Schema } from "mongoose";
import { UserRoles } from "../../common/enum/roles.enum";

export const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    enum: UserRoles,
    default: UserRoles.User
  }
}, { timestamps: true });

UserSchema.index({ username: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });
