import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUsecase } from './usecase/login.usecase';

@Injectable()
export class AuthService {
  constructor(private readonly loginUsecase: LoginUsecase) {}

  async login(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;
    const user = await this.loginUsecase.validate(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = await this.loginUsecase.generateCredential({
      username: user.username,
      sub: user.id.toString(),
    });
    if (!token) {
      throw new HttpException(
        'Token was failed to generate',
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      message: 'Ok',
      username: username,
      access_token: token,
    };
  }
}
