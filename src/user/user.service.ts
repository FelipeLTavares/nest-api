import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const userByEmail = await this.findByEmail(createUserDto.email);
    if(userByEmail) throw new Error('E-mail already in use!');

    const { name, email, password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({ name, email, password: hashedPassword });
    const savedUser = await this.userRepository.save(user);

    return UserDto.toDto(savedUser);
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.userRepository.find()
    return users.map(user => UserDto.toDto(user));
  }

  async findOne(id: number): Promise<UserDto> {
    let user = await this.userRepository.findOne({ where: { id } });
    return user ? UserDto.toDto(user) : user;
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } })
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOne({ where: { id } });
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return UserDto.toDto(updatedUser);
  }

  async changeStatus(id: number): Promise<UserDto> {
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    user.active = !user.active;
    await this.userRepository.save(user);
    return UserDto.toDto(user);
  }
}
