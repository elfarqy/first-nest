import { CanActivate, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../service/prisma.service';
import { ExecutionContext } from '@nestjs/common/interfaces/features/execution-context.interface';

export class AuthorizationGuard implements CanActivate {
  constructor(private prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Token must be provided');
    }

    if (typeof this.prismaService == 'undefined') {
      this.prismaService = new PrismaService();
    }

    const token = authHeader.replace('Bearer ', '');
    const isValid = await this.validateToken(token);

    if (!isValid) {
      throw new UnauthorizedException(
        'Token is invalid or inactive, please login again',
      );
    }

    return isValid;
  }

  async validateToken(token: any) {
    const device = await this.prismaService.device.findFirst({
      where: { token },
    });


    return !(!device && device.status !== 'active');
  }
}
