import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';
import { Request } from 'express';
import { IUser } from '../interfaces/user.interface';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    console.log({ data, ctx });
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user as IUser;
    if (!user) {
      throw new InternalServerErrorException('User not found, please login');
    }
    return data ? user?.[data] : user;
  },
);