import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from '../service/prisma.service';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'IsUnique', async: false })
@Injectable()
export class isUniqueDecorator implements ValidatorConstraintInterface {
  constructor(private prisma: PrismaService) {}

  async validate(
    username: string,
    args: ValidationArguments,
  ): Promise<boolean> {
    if (!args) {
      console.log(args);
    }
    // this.prisma = new PrismaService();
    // console.log(typeof this.prisma);
    // if (typeof this.prisma == 'undefined') {
    //   this.prisma = new PrismaService();
    //
    //   console.log(typeof this.prisma);
    // }

    console.log(typeof this.prisma);
    return true;
    // const user = await this.prisma.user.findFirst({ where: { username } });
    // return !user;
  }

  defaultMessage(args: ValidationArguments): string {
    if (!args) {
      console.log(args);
    }
    return 'Username already exists';
  }
}

export function IsUnique(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: isUniqueDecorator,
    });
  };
}
