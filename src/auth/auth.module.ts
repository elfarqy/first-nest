import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { isUniqueDecorator } from '../decorator/is-unique.decorator';
import { UserService } from './service/user.service';
import { PrismaService } from '../service/prisma.service';
import { IsUsernameNotEmailValidator } from './validator/is-username-exist.validator';

@Module({
  providers: [
    AuthService,
    UserService,
    isUniqueDecorator,
    PrismaService,
    IsUsernameNotEmailValidator,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
