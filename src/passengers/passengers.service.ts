import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Collections } from '@common/models/collections';
import mongoose, { Model } from 'mongoose';
import { Passenger } from './schemas/passenger.schema';

@Injectable()
export class PassengersService {
  constructor(
    @InjectModel(Collections.Passenger)
    private readonly passengersModel: Model<Passenger>
  ) { };
  private logger = new Logger('PassengersService');
  async create(createPassengerDto: CreatePassengerDto): Promise<Passenger> {
    try {
      const passenger = await this.passengersModel.create(createPassengerDto);
      return passenger;
    } catch (error) {
      this.handleException(error)
    }
  }

  async findAll(): Promise<Passenger[]> {
    const passengers = await this.passengersModel.find();
    return passengers;
  }

  async findOne(id: string): Promise<Passenger> {
    const isValidObjectId = mongoose.isValidObjectId(id);
    if (!isValidObjectId) {
      throw new BadRequestException('id must be a valid MongoDB ObjectId.')
    }
    const passenger = await this.passengersModel.findOne({ _id: id });
    if (!passenger) {
      throw new NotFoundException(`Passenger with ${id} not found`);
    }
    return passenger;
  }

  async update(id: string, updatePassengerDto: UpdatePassengerDto): Promise<Passenger> {
    try {
      const newPassenger = await this.passengersModel.findByIdAndUpdate({ _id: id }, updatePassengerDto, { new: true });
      return newPassenger;
    } catch (error) {
      this.handleException(error)
    }
  }

  async remove(id: string): Promise<Passenger> {
    const passenger = await this.findOne(id);
    await this.passengersModel.deleteOne({ _id: id });
    return passenger;
  }

  private handleException(error: any) {
    this.logger.error(error);
    if (error.code === 11000) {
      const duplicateKeys = Object.keys(error.keyValue);
      const msg = `${duplicateKeys} are already in use, please try again`;
      throw new BadRequestException(msg);
    }
    throw error;
  }
}
