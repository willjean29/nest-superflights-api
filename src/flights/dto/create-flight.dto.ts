import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateFlightDto {
  @IsNotEmpty()
  @IsString()
  private readonly pilot: string;
  @IsNotEmpty()
  @IsString()
  private readonly airplane: string;
  @IsNotEmpty()
  @IsString()
  private readonly destinationCity: string;
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  private readonly flightDate: Date
}
