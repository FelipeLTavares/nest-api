import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { CreateUserDto } from './create-user.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('login')
    public signIn(
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        return this.authService.signIn(email, password);
    }

    @Public()
    @Post('register')
    public register(
        @Body() createUserDto: CreateUserDto
    ) {
        return this.authService.register(createUserDto);
    }
}
