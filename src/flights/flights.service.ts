import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Collections } from '../common/models/collections';
import { Model } from 'mongoose';
import { IFlight } from '../common/interfaces/flight.interface';
import { PassengersService } from '../passengers/passengers.service';

@Injectable()
export class FlightsService {
  constructor(
    @InjectModel(Collections.Flights)
    private readonly flightModel: Model<IFlight>,
    private readonly passengersService: PassengersService
  ) { }

  async create(createFlightDto: CreateFlightDto): Promise<IFlight> {
    const flight = new this.flightModel(createFlightDto);
    await flight.save();
    return flight;
  }

  async findAll(): Promise<IFlight[]> {
    const flights = await this.flightModel.find().populate(Collections.Passenger);
    return flights;
  }

  async findOne(id: string): Promise<IFlight> {
    const flight = await this.flightModel.findOne({ _id: id }).populate(Collections.Passenger);
    if (!flight) {
      throw new NotFoundException(`Flight with ${id} not found`);
    }
    return flight;
  }

  async update(id: string, updateFlightDto: UpdateFlightDto) {
    await this.findOne(id);
    const newFLight = await this.flightModel.findByIdAndUpdate(id, updateFlightDto, { new: true });
    return newFLight;
  }

  async remove(id: string): Promise<IFlight> {
    const flight = await this.findOne(id)
    await this.flightModel.deleteOne({ _id: id });
    return flight
  }

  async addPassenger(flightId: string, passengerId: string): Promise<IFlight> {
    await this.findOne(flightId)
    await this.passengersService.findOne(passengerId);
    const flight = await this.flightModel.findByIdAndUpdate(flightId, {
      $addToSet: {
        passengers: passengerId
      }
    }, { new: true }).populate(Collections.Passenger);
    return flight;
  }
}
