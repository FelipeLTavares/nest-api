import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('login')
    public signIn(
        @Body('email') email: string,
        @Body('password') password: string,
    ): Promise<SignInDto> {
        return this.authService.signIn(email, password);
    }

    @Public()
    @Post('register')
    public register(
        @Body() createUserDto: CreateUserDto
    ): Promise<CreateUserDto> {
        return this.authService.register(createUserDto);
    }
}
