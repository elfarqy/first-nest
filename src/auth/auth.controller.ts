import { Body, Controller, Post, UseInterceptors } from "@nestjs/common";
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './service/user.service';
import { ResponseInterceptor } from '../interceptor/response.interceptor';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('signup')
  @UseInterceptors(ResponseInterceptor)
  async signup(@Body() data: CreateUserDto) {
    return this.userService.createUser(data);
  }
}
