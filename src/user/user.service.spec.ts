// user.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';

const users: User[] = [{ id: 1, active: true, email: 'user@email.com', name: 'John Doe', password: '123' }]

const mockUserRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    changeStatus: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UserService', () => {
    let service: UserService;
    let repository: MockRepository<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                { provide: getRepositoryToken(User), useValue: mockUserRepository() },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        repository = module.get<MockRepository<User>>(getRepositoryToken(User));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create method', () => {
        it('should create one user', async () => {
            repository.create.mockResolvedValue(users[0]);
            repository.save.mockResolvedValue(users[0]);

            const result = await service.create(users[0]);
            expect(repository.save).toHaveBeenCalled();
            expect(result).toEqual(UserDto.toDto(users[0]));
        });
    })

    describe('findAll method', () => {
        it('should find all users', async () => {
            repository.find.mockResolvedValue(users);

            const result = await service.findAll();
            expect(result).toEqual(users.map(el => UserDto.toDto(el)));
            expect(repository.find).toHaveBeenCalled();
        });
    })

    describe('findOne method', () => {
        it('should find one vehicle', async () => {
            repository.findOne.mockResolvedValue(users[0]);

            const result = await service.findOne(1);
            expect(repository.findOne).toHaveBeenCalled();
            expect(result).toEqual(UserDto.toDto(users[0]));
        });
    })

    describe('patch method', () => {
        it('should call the update method', async () => {
            const updatedUser = { ...users[0], name: 'Doe' }
            repository.findOne.mockResolvedValue(updatedUser);
            repository.update.mockResolvedValue(updatedUser);

            const response = await service.update(1, updatedUser);

            expect(repository.update).toHaveBeenCalledWith(1, updatedUser);
            expect(response).toEqual(UserDto.toDto(updatedUser));
        });

        it('should call the service of updateStatus', async () => {
            const updatedUser = { ...users[0], active: false }
            repository.findOne.mockResolvedValue(users[0]);
            repository.save.mockResolvedValue(updatedUser);

            const response = await service.changeStatus(1);

            expect(response).toEqual(UserDto.toDto(updatedUser));
        });
    })
});
