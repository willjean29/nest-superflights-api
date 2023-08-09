import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateFlightDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  private readonly pilot: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  private readonly airplane: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  private readonly destinationCity: string;
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  private readonly flightDate: Date
}
