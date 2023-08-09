import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { Request } from 'express';
import { UserDto } from '../users/dto/user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/signin')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto)
  }

  @Post('/signup')
  async signUp(@Req() req: Request, @Body() userDto: UserDto) {
    return await this.authService.signUp(userDto);
  }
}
