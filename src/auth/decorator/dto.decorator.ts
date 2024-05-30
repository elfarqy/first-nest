import { SetMetadata } from '@nestjs/common';

export const Dto = (...args: string[]) => SetMetadata('dto', args);
