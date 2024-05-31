import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../service/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto) {
    const { username, password } = data;
    this.prisma.user.create({
      data: {
        username: username,
        password: await bcrypt.hash(password, 10),
      },
    });
    return { username: username };
  }
}
