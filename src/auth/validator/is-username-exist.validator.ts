import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../service/prisma.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUsernameNotEmailValidator
  implements ValidatorConstraintInterface
{
  constructor(private readonly prisma: PrismaService) {}

  async validate(
    username: string,
    args: ValidationArguments,
  ): Promise<boolean> {
    if (!args) {
      console.log(args);
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
