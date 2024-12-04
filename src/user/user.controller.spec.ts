import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

const users: User[] = [
  {
    id: 1,
    name: 'John',
    email: 'johndoe@email.com',
    password: '123',
    active: true
  }
]

describe('UserController', () => {
  let controller: UserController;
  let service: jest.Mocked<Partial<UserService>>;

  const mockService = () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    changeStatus: jest.fn(),
    remove: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockService(),
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create method', () => {
    it('should call the create service', async () => {
      service.create.mockResolvedValue(users[0]);

      const response = await controller.create(users[0]);

      expect(service.create).toHaveBeenCalledWith(users[0]);
      expect(response).toEqual(users[0]);
    });
  });

  describe('findAll method', () => {
    it('should call the findAll service', async () => {
      service.findAll.mockResolvedValue(users);

      const response = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(response).toEqual(users);
    });
  });

  describe('findOne method', () => {
    it('should call the findOne service', async () => {
      service.findOne.mockResolvedValue(users[0]);

      const response = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(response).toEqual(users[0]);
    });
  });

  describe('patch method', () => {
    it('should call the update method', async () => {
      const updatedUser = { ...users[0], name: 'Doe' }
      service.update.mockResolvedValue(updatedUser);

      const response = await controller.update('1', updatedUser);

      expect(service.update).toHaveBeenCalledWith(1, updatedUser);
      expect(response).toEqual(updatedUser);
    });

    it('should call the service of updateStatus service', async () => {
      const updatedUser = { ...users[0], active: false }
      service.changeStatus.mockResolvedValue(updatedUser);

      const response = await controller.changeStatus('1');

      expect(service.changeStatus).toHaveBeenCalledWith(1);
      expect(response).toEqual(updatedUser);
    });
  })

});
