import { Test, TestingModule } from '@nestjs/testing';
import { PassengersController } from './passengers.controller';
import { PassengersService } from './passengers.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('PassengersController', () => {
  let passengersController: PassengersController;
  let passengersService: PassengersService;

  const mockPassenger = {
    _id: "64da5ad54745197fc7b81709",
    name: "Marco Torres",
    email: "marco@gmail.com",
    createdAt: "2023-08-14T16:48:21.050Z",
    updatedAt: "2023-08-14T16:48:21.050Z"
  }

  const mockPassengersService = {
    create: jest.fn(),
    findAll: jest.fn().mockResolvedValue([mockPassenger]),
    findOne: jest.fn().mockResolvedValue(mockPassenger),
    remove: jest.fn(),
    update: jest.fn()
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassengersController],
      providers: [
        {
          provide: PassengersService,
          useValue: mockPassengersService
        }
      ],
    }).compile();

    passengersController = module.get<PassengersController>(PassengersController);
    passengersService = module.get<PassengersService>(PassengersService);
  });

  it('should be defined', () => {
    expect(passengersController).toBeDefined();
  });

  describe('createPassenger', () => {

    it('should craete a new passenger', async () => {
      const newPassenger = {
        name: "Marco Torres",
        email: "marco@gmail.com",
      }
      jest.spyOn(passengersService, 'create').mockResolvedValue(mockPassenger as any);
      const passenger = await passengersController.create(newPassenger);
      expect(passenger).toEqual(mockPassenger);
    });

    it('should throw BadRequestException if duplicated data is provided', async () => {
      const newPassenger = {
        name: "Marco Torres",
        email: "marco@gmail.com",
      }
      const mockError = new BadRequestException('email are already in use, please try again')
      jest.spyOn(passengersService, 'create').mockRejectedValue(mockError);
      await expect(passengersController.create(newPassenger)).rejects.toThrow(BadRequestException);
    });
  })

  describe('getAllPassengers', () => {
    it('should get all passengers', async () => {
      const result = await passengersController.findAll();
      expect(passengersService.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockPassenger]);
    });
  })

  describe('getPassengerById', () => {
    it('should get passenger by id', async () => {
      const result = await passengersController.findOne(mockPassenger._id);
      expect(passengersService.findOne).toHaveBeenCalledWith(mockPassenger._id);
      expect(result).toEqual(mockPassenger);
    });

    it('should throw BadRequestException if inavlid id is provided', async () => {
      const id = "invalid-id";
      const mockError = new BadRequestException("id must be a valid MongoDB ObjectId.");
      jest.spyOn(passengersService, 'findOne').mockRejectedValue(mockError)
      await expect(passengersController.findOne(id)).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if passenger is not found', async () => {
      const mockError = new NotFoundException("Passenger with 64da5ad54745197fc7b81709 not found");
      jest.spyOn(passengersService, 'findOne').mockRejectedValue(mockError);
      await expect(passengersController.findOne(mockPassenger._id)).rejects.toThrow(NotFoundException);
    });
  })

  describe('updatePassengerById', () => {
    it('should update the data of the passenger found by id', async () => {
      const updatePassenger = { ...mockPassenger, name: "Juan Rivas" }
      const passenger = { name: "Juan Rivas" }
      jest.spyOn(passengersService, 'update').mockResolvedValue(updatePassenger as any);
      const result = await passengersController.update(mockPassenger._id, passenger);
      expect(passengersService.update).toHaveBeenCalledWith(mockPassenger._id, passenger)
      expect(updatePassenger.name).toEqual(result.name);
    });

    it('should throw BadRequestException if duplicated data is provided', async () => {
      const passenger = { email: "jean@gmail.com" }
      const mockError = new BadRequestException('email are already in use, please try again')
      jest.spyOn(passengersService, 'update').mockRejectedValue(mockError);
      await expect(passengersController.update(mockPassenger._id, passenger)).rejects.toThrow(BadRequestException);
    });
  })

  describe('deletePassengerById', () => {
    it('should delete passenger found by id', async () => {
      jest.spyOn(passengersService, 'remove').mockResolvedValue(mockPassenger as any);
      const result = await passengersController.remove(mockPassenger._id);
      expect(result).toEqual(mockPassenger);
      expect(passengersService.remove).toBeCalledWith(mockPassenger._id)
    });
  })
});
