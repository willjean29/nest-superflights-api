import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/common/interfaces/user.interface';
import { Collections } from 'src/common/models/collections';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Collections.User)
    private readonly userModel: Model<IUser>
  ) { };

  async hashPassword(password: string): Promise<string> {
    const salts = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salts);
  }

  async create(userDto: UserDto): Promise<IUser> {
    const { password } = userDto;
    const user = new this.userModel({
      ...userDto,
      password: await this.hashPassword(password)
    });
    await user.save();
    return user;
  }

  async findOne(id: string): Promise<IUser> {
    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      throw new NotFoundException(`User with ${id} not found`);
    }
    return user;
  }

  async findAll(): Promise<IUser[]> {
    const users = await this.userModel.find();
    return users;
  }

  async update(userDto: UserDto, id: string): Promise<IUser> {
    const { password } = userDto;
    await this.findOne(id);
    if (password) {
      userDto = {
        ...userDto,
        password: await this.hashPassword(password)
      }
    }

    const newUser = await this.userModel.findByIdAndUpdate({ _id: id }, userDto, { new: true });
    return newUser;
  }

  async deleteOne(id: string): Promise<IUser> {
    const user = await this.findOne(id);
    await this.userModel.deleteOne({ _id: id });
    return user;
  }
}
