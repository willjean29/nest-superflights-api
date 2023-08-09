import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/common/interfaces/jwt-payload.interface';
import { UserDto } from '../users/dto/user.dto';
import { IUserSession } from 'src/common/interfaces/user-session.interface';

export interface IUserTemp {
  userId: number;
  username: string;
  password: string;
}
@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async signIn(signInDto: SignInDto): Promise<IUserSession> {
    const { email, password } = signInDto;
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credentials are not valid (email)');
    }
    const isValidPassword = await this.usersService.checkPassword(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Credentials are not valid (password)');
    }
    return {
      user,
      token: this.getJwtToken({ id: user._id }),
    };
  }

  async signUp(userDto: UserDto): Promise<IUserSession> {
    const user = await this.usersService.create(userDto);
    return {
      user,
      token: this.getJwtToken({ id: user._id }),
    };
  }

  private getJwtToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }
}

