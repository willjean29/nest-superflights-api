import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { Collections } from '../common/models/collections';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Collections.User,
        useFactory: () => {
          return UserSchema
        }
      }
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule { }
