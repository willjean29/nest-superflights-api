import { Test, TestingModule } from '@nestjs/testing';
import { PassengersService } from './passengers.service';
import { IPassenger } from '../common/interfaces/passenger.interface';
import mongoose, { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('PassengersService', () => {
  let passengersService: PassengersService;
  let model: Model<IPassenger>
  const mockPassenger = {
    _id: "64da5ad54745197fc7b81709",
    name: "Marco Torres",
    email: "marco@gmail.com",
    createdAt: "2023-08-14T16:48:21.050Z",
    updatedAt: "2023-08-14T16:48:21.050Z"
  }
  const mockPassengersService = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    deleteOne: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PassengersService,
        {
          provide: getModelToken('passengers'),
          useValue: mockPassengersService
        }
      ],
    }).compile();
    passengersService = module.get<PassengersService>(PassengersService);
    model = module.get<Model<IPassenger>>(getModelToken('passengers'));
    jest.spyOn<any, any>(passengersService, 'handleException');
  });

  it('should be defined', () => {
    expect(passengersService).toBeDefined();
  });

  describe('create', () => {

    it('should craete a return book', async () => {
      const newPassenger = {
        name: "Marco Torres",
        email: "marco@gmail.com",
      }
      jest.spyOn(model, 'create').mockResolvedValue(mockPassenger as any);
      const passenger = await passengersService.create(newPassenger);
      expect(passenger).toEqual(mockPassenger);
    });

    it('should throw BadRequestException if duplicated data is provided', async () => {
      const newPassenger = {
        name: "Marco Torres",
        email: "marco@gmail.com",
      }
      const mockError = new BadRequestException('email are already in use, please try again')
      jest.spyOn(model, 'create').mockRejectedValue(mockError);
      const handleException = jest.spyOn(passengersService as any, 'handleException');
      await expect(passengersService.create(newPassenger)).rejects.toThrow(BadRequestException);
      expect(handleException).toBeTruthy()
    });
  })

  describe('findOne', () => {
    it('should find and return  passenger by ID', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValue(mockPassenger);
      const result = await passengersService.findOne(mockPassenger._id);
      expect(model.findOne).toHaveBeenCalledWith({ _id: mockPassenger._id });
      expect(result).toEqual(mockPassenger);
    });

    it('should throw BadRequestException if inavlid id is provided', async () => {
      const id = "invalid-id";
      const isValidObjectIdMock = jest.spyOn(mongoose, 'isValidObjectId').mockReturnValue(false);
      await expect(passengersService.findOne(id)).rejects.toThrow(BadRequestException);
      expect(isValidObjectIdMock).toHaveBeenCalledWith(id);
      isValidObjectIdMock.mockRestore()
    });

    it('should throw NotFoundException if passenger is not found', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValue(null);
      await expect(passengersService.findOne(mockPassenger._id)).rejects.toThrow(NotFoundException);
      expect(model.findOne).toHaveBeenCalledWith({ _id: mockPassenger._id });
    });
  })

  describe('find', () => {
    it('should return an array of passengers', async () => {
      jest.spyOn(model, 'find').mockResolvedValue([mockPassenger]);
      const result = await passengersService.findAll();
      expect(model.find).toHaveBeenCalled();
      expect(result).toEqual([mockPassenger]);
    });
  })

  describe('updateById', () => {
    it('should update the data of the passenger found by id', async () => {
      const updatePassenger = { ...mockPassenger, name: "Juan Rivas" }
      const passenger = { name: "Juan Rivas" }
      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(updatePassenger);
      const result = await passengersService.update(mockPassenger._id, passenger);
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith({ _id: mockPassenger._id }, passenger, { new: true })
      expect(updatePassenger.name).toEqual(result.name);
    });

    it('should throw BadRequestException if duplicated data is provided', async () => {
      const passenger = { email: "jean@gmail.com" }
      const mockError = new BadRequestException('email are already in use, please try again')
      jest.spyOn(model, 'findByIdAndUpdate').mockRejectedValue(mockError);
      const handleException = jest.spyOn(passengersService as any, 'handleException');
      await expect(passengersService.update(mockPassenger._id, passenger)).rejects.toThrow(BadRequestException);
      expect(handleException).toBeTruthy()
    });
  })

  describe('deleteById', () => {
    it('should delete passenger found by id', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValue(mockPassenger);
      jest.spyOn(model, 'deleteOne').mockResolvedValue(mockPassenger as any);
      const result = await passengersService.remove(mockPassenger._id);
      expect(model.deleteOne).toHaveBeenCalledWith({ _id: mockPassenger._id })
      expect(result).toEqual(mockPassenger);
    });
  })

  describe('handleException', () => {
    it('should throw BadRequestException if duplicated data is provided', async () => {
      const mockError = {
        ok: 0,
        code: 11000,
        codeName: "DuplicateKey",
        keyPattern: {
          email: 1
        },
        keyValue: {
          email: "juan@gmail.com"
        }
      }
      const mockThrowError = new BadRequestException('email are already in use, please try again')
      expect(() => passengersService['handleException'](mockError)).toThrow(mockThrowError);
    });

    it('should throw original error for non-duplicate key error', () => {
      const error = new Error('Some other error message');

      expect(() => passengersService['handleException'](error)).toThrow(Error);
      expect(() => passengersService['handleException'](error)).toThrow('Some other error message');
    });
  })
});
