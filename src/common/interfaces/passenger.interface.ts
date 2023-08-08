import { Document } from "mongoose";

export interface IPassenger extends Document {
  name: string;
  email: string;
}