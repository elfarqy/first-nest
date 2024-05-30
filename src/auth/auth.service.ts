import { Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  async login(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;

    return {
      message: 'Ok',
      username: username,
      password: password,
    };
  }
}
