import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PassengersModule } from './passengers/passengers.module';
import { FlightsModule } from './flights/flights.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/superflights'), UsersModule, PassengersModule, FlightsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
