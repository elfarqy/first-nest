import { PrismaService } from '../../service/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginUsecase {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(username: string, password: string) {
    const user = await this.prismaService.user.findFirst({
      where: { username: username },
    });
    if (!user) {
      throw new NotFoundException();
    }
    if (await bcrypt.compare(password, user.password)) {
      const { ...result } = user;
      return result;
    }

    return null;
  }

  async generateCredential(payload: any) {
    const { username, sub } = payload;
    if (!username || !sub) {
      console.log('invalid credentials');
    }
    const token = this.jwtService.sign(payload);
    await this.prismaService.device.updateMany({
      where: {
        user_id: sub,
      },
      data: {
        status: 'deleted',
      },
    });
    await this.prismaService.device.create({
      data: {
        token,
        user_id: sub,
        status: 'active',
      },
    });
    return token;
  }
}
