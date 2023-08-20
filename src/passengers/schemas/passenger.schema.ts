import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
@Schema({
  timestamps: true
})
export class Passenger {
  @Prop()
  name: string;

  @Prop()
  email: string;
}

export const PassengerSchema = SchemaFactory.createForClass(Passenger);

PassengerSchema.index({ email: 1 }, { unique: true })