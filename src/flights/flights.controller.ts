import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from '../auth/guards/role-auth.guard';
import { MongoIdValidationPipe } from '../common/pipes/MongoIdValidationPipe';
import { RoleProtected } from '../common/decorators/role-protected.decorator';
import { UserRoles } from '../common/enum/roles.enum';
import { Auth } from '../common/decorators/auth.decorator';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { IUser } from 'src/common/interfaces/user.interface';

@ApiTags('flights')
@ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) { }

  @Post()
  create(@Body() createFlightDto: CreateFlightDto) {
    return this.flightsService.create(createFlightDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.flightsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', MongoIdValidationPipe) id: string) {
    return this.flightsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', MongoIdValidationPipe) id: string, @Body() updateFlightDto: UpdateFlightDto) {
    return this.flightsService.update(id, updateFlightDto);
  }

  @Delete(':id')
  remove(@Param('id', MongoIdValidationPipe) id: string) {
    return this.flightsService.remove(id);
  }

  @Post(':fligthId/passengers/:passengerId')
  addPassenger(@Param('fligthId', MongoIdValidationPipe) fligthId: string, @Param('passengerId', MongoIdValidationPipe) passengerId: string) {
    return this.flightsService.addPassenger(fligthId, passengerId);
  }
}
