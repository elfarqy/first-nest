import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { isUniqueDecorator } from '../decorator/is-unique.decorator';
import { UserService } from './service/user.service';
import { PrismaService } from '../service/prisma.service';
import { IsUsernameNotEmailValidator } from './validator/is-username-exist.validator';
import { ResponseInterceptor } from '../interceptor/response.interceptor';
import { LoginUsecase } from './usecase/login.usecase';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [
    AuthService,
    UserService,
    isUniqueDecorator,
    PrismaService,
    IsUsernameNotEmailValidator,
    ResponseInterceptor,
    LoginUsecase,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
