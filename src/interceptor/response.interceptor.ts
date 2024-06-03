import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: any) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        message: 'Request successful',
        data: typeof data == 'object' ? data : { data },
      })),
    );
  }
}
