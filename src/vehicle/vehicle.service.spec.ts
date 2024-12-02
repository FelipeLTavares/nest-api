// user.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './entities/vehicle.entity';
import { NotFoundException } from '@nestjs/common';

const mockUserRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  create: jest.fn()
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UserService', () => {
  let service: VehicleService;
  let repository: MockRepository<Vehicle>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehicleService,
        { provide: getRepositoryToken(Vehicle), useValue: mockUserRepository() },
      ],
    }).compile();

    service = module.get<VehicleService>(VehicleService);
    repository = module.get<MockRepository<Vehicle>>(getRepositoryToken(Vehicle));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create method', () => {
    it('should create one vehicle', async () => {
      const vehicle = { id: 1, make: 'Ford', model: 'Ka', year: 2017, mileage: 60000, description: 'teste', createdAt: new Date(), updatedAt: new Date() };
      repository.create.mockResolvedValue(vehicle);
      repository.save.mockResolvedValue(vehicle);

      const result = await service.create(vehicle);
      expect(repository.save).toHaveBeenCalled();
      expect(result).toEqual(vehicle);
    });
  })

  describe('findAll method', () => {
    it('should find all vehicles', async () => {
      const vehicles = [{ id: 1, make: 'Ford', model: 'Ka', year: 2017, mileage: 60000, description: 'teste', createdAt: new Date(), updatedAt: new Date() }];
      repository.find.mockResolvedValue(vehicles);

      const result = await service.findAll();
      expect(result).toEqual(vehicles);
      expect(repository.find).toHaveBeenCalled();
    });
  })

  describe('findOne method', () => {
    it('should find one vehicle', async () => {
      const vehicle = { id: 1, make: 'Ford', model: 'Ka', year: 2017, mileage: 60000, description: 'teste', createdAt: new Date(), updatedAt: new Date() };
      repository.findOne.mockResolvedValue(vehicle);

      const result = await service.findOne(1);
      expect(repository.findOne).toHaveBeenCalled();
      expect(result).toEqual(vehicle);
    });
  })

  describe('delete method', () => {
    it('should delete one vehicle', async () => {
      const vehicle = { id: 1, make: 'Ford', model: 'Ka', year: 2017, mileage: 60000, description: 'teste', createdAt: new Date(), updatedAt: new Date() };
      repository.findOne.mockResolvedValue(vehicle);
      repository.delete.mockResolvedValue(undefined);

      await service.remove(1);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.delete).toHaveBeenCalled()
    });

    it('should throw an error when the vehicle dont exists', async () => {
      const vehicle = { id: 1, make: 'Ford', model: 'Ka', year: 2017, mileage: 60000, description: 'teste', createdAt: new Date(), updatedAt: new Date() };
      repository.findOne.mockResolvedValue(undefined);

      await expect(service.remove(1)).rejects.toThrow(
        new NotFoundException(`Vehicle with ID ${1} not found`),
      );

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.delete).not.toHaveBeenCalled();
    });
  })
});
