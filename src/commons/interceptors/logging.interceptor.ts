/*
https://docs.nestjs.com/interceptors#interceptors
*/

import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log("Before reaching the request handler");
    const startTime = Date.now();

    const methodName = context.getHandler().name;
    const className = context.getClass().name;
    
    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(`Response Lag for ${methodName} in class ${className}: ${Date.now() - startTime}ms`)
        )
      )
  }
}
