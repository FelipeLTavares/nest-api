import { Test, TestingModule } from '@nestjs/testing';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './entities/vehicle.entity';
import { NotFoundException } from '@nestjs/common';

const vehicles: Vehicle[] = [{ id: 1, make: 'Ford', model: 'Ka', mileage: 50000, year: 2015, description: 'Short description', createdAt: new Date(), updatedAt: new Date() }];

describe('VehicleController', () => {
  let controller: VehicleController;
  let service: jest.Mocked<Partial<VehicleService>>;

  const mockService = () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleController],
      providers: [
        {
          provide: VehicleService,
          useValue: mockService(),
        },
      ],
    }).compile();

    controller = module.get<VehicleController>(VehicleController);
    service = module.get(VehicleService);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create method', () => {
    it('Should create a new vehicle with the correct DTO', async () => {
      service.create.mockResolvedValue(vehicles[0]);

      const response = await controller.create(vehicles[0]);

      expect(service.create).toHaveBeenCalledWith(vehicles[0]);
      expect(response).toEqual(vehicles[0]);
    });
  });

  describe('findAll method', () => {
    it('Should call the service and return all vehicles', async () => {
      service.findAll.mockResolvedValue(vehicles);

      const response = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(response).toEqual(vehicles);
    });
  });

  describe('findOne method', () => {
    it('Should call the service and return a single vehicle', async () => {
      service.findOne.mockResolvedValue(vehicles[0]);

      const response = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(response).toEqual(vehicles[0]);
    });

    it('Should throw an error if dont find a vehicle with that id', async () => {
      service.findOne.mockResolvedValue(null);

      const response = await controller.findOne('99');

      expect(service.findOne).toHaveBeenCalledWith(99);
      expect(response).toBeNull();
    });
  });

  describe('remove method', () => {
    it('Should call the service with that id', async () => {
      const id = 1;

      await controller.remove(id.toString());

      expect(service.remove).toHaveBeenCalledWith(id);
    });

    it('Should throw an error when the vehicle doesnt exists', async () => {
      const id = 1;
      service.remove.mockRejectedValue(
        new NotFoundException(`Vehicle with ID ${id} not found`),
      );

      await expect(controller.remove(id.toString())).rejects.toThrow(
        new NotFoundException(`Vehicle with ID ${id} not found`),
      );
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });

});
