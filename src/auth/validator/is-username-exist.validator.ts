import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../service/prisma.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUsernameNotEmailValidator
  implements ValidatorConstraintInterface
{
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async validate(
    username: string,
    args: ValidationArguments,
  ): Promise<boolean> {
    if (!args) {
      console.log(args);
    }
    if (typeof this.prisma == 'undefined') {
      this.prisma = new PrismaService();
    }
    const user = await this.prisma.user.findFirst({
      where: { username: username },
    });
    return !user;
  }

  defaultMessage(args: ValidationArguments): string {
    if (!args) {
      console.log(args);
    }
    return 'Username should not match any email in the database';
  }
}
