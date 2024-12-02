import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VehicleService {

  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) { }

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const vehicle = this.vehicleRepository.create(createVehicleDto);
    const savedVehicle = await this.vehicleRepository.save(vehicle);
    return savedVehicle;
  }

  async findAll() {
    return this.vehicleRepository.find();
  }

  async findOne(id: number) {
    return this.vehicleRepository.findOne({ where: { id } })
  }

  async remove(id: number): Promise<void> {
    const result = await this.vehicleRepository.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
    await this.vehicleRepository.delete(id);
  }

}
