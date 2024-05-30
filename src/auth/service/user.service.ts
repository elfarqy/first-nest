import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../service/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto) {
    console.log(typeof this.prisma);
    return this.prisma.user.create({ data });
  }
}
