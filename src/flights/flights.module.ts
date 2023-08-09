import { Module } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Collections } from '../common/models/collections';
import { FlightSchema } from './schemas/flight.schema';
import { PassengersModule } from '../passengers/passengers.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Collections.Flights,
        useFactory: () => {
          return FlightSchema.plugin(require('mongoose-autopopulate'));
        }
      }
    ]),
    PassengersModule
  ],
  controllers: [FlightsController],
  providers: [FlightsService],
})
export class FlightsModule { }
