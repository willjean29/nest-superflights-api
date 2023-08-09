import { Module } from '@nestjs/common';
import { PassengersService } from './passengers.service';
import { PassengersController } from './passengers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Collections } from '../common/models/collections';
import { PassengerSchema } from './schemas/passenger.schema';

@Module({
  imports: [MongooseModule.forFeatureAsync([
    {
      name: Collections.Passenger,
      useFactory: () => {
        return PassengerSchema
      }
    }
  ])],
  controllers: [PassengersController],
  providers: [PassengersService],
  exports: [PassengersService]
})
export class PassengersModule { }
