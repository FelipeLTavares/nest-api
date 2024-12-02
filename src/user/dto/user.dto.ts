import { User } from "../entities/user.entity";

export class UserDto {
    id: number;
    name: string;
    email: string;
    active: boolean;

    static toDto (user: User): UserDto {
      const userDto = new UserDto();
      userDto.id = user.id
      userDto.name = user.name
      userDto.email = user.email
      userDto.active = user.active

      return userDto
    }
  }