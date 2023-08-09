import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '..//auth/guards/jwt-auth.guard';
import { MongoIdValidationPipe } from '../common/pipes/MongoIdValidationPipe';

@ApiTags('users')
@ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService
  ) { };

  @ApiOperation({ summary: 'Create a new user' })
  @Post()
  create(@Body() userDto: UserDto) {
    return this.usersService.create(userDto)
  }

  @Put('/roles')
  updateRoles() {
    return this.usersService.updateExistingUsersWithDefaultRole()
  }

  @Get(':id')
  findOne(@Param('id', MongoIdValidationPipe) id: string) {
    return this.usersService.findOne(id)
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Put(':id')
  update(@Body() userDto: UserDto, @Param('id', MongoIdValidationPipe) id: string) {
    return this.usersService.update(userDto, id);
  }

  @Delete(':id')
  deleteOnte(@Param('id', MongoIdValidationPipe) id: string) {
    return this.usersService.deleteOne(id);
  }
}
