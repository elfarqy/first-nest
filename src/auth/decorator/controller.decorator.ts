import { SetMetadata } from '@nestjs/common';

export const Controller = (...args: string[]) =>
  SetMetadata('controller', args);
