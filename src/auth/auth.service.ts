import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { SignInDto } from './dto/signin.dto';
import { UserDto } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    public async signIn(email: string, password: string): Promise<SignInDto> {
        const foundedUser = await this.userService.findByEmail(email);
        if (!foundedUser) throw new UnauthorizedException('User not found');

        const isPasswordValid = await bcrypt.compare(password, foundedUser.password);
        if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

        const payload = {
            sub: foundedUser.id,
            name: foundedUser.name,
            email: foundedUser.email
        };

        const token = this.jwtService.sign(payload);

        return { token, expiresIn: '60s' };
    }


    public async register(createUserDto: CreateUserDto): Promise<UserDto> {
        return this.userService.create(createUserDto);
    }

}
