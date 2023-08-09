import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor() {
    super()
  }

  async validate(username: string, password: string): Promise<any> {
    if (!username || !password) {
      return null;
    }
    if (username === "jean@gmail.com" && password === "123456") {
      return {
        username, password
      }
    }
    return null;
  }
}