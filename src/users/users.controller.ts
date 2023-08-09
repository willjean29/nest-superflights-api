import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Put(':id')
  update(@Body() userDto: UserDto, @Param('id') id: string) {
    return this.usersService.update(userDto, id);
  }

  @Delete(':id')
  deleteOnte(@Param('id') id: string) {
    return this.usersService.deleteOne(id);
  }
}
