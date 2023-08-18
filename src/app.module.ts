import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PassengersModule } from './passengers/passengers.module';
import { FlightsModule } from './flights/flights.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL), UsersModule, PassengersModule, FlightsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
