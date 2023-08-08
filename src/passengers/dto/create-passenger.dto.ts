import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreatePassengerDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
