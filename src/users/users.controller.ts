import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
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
