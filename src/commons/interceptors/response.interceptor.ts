/*
https://docs.nestjs.com/interceptors#interceptors
*/

import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, map } from 'rxjs'

export interface DataResponse<T> {
  status_code: number;
  success: boolean;
  message_title: string;
  message: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, DataResponse<T>> {
  constructor(private reflector: Reflector) { }
  intercept(context: ExecutionContext, next: CallHandler): Observable<DataResponse<T>> {
    const ctx = context.switchToHttp()
    return next
      .handle()
      .pipe(
        map((data) => ({
            status_code: ctx.getResponse().statusCode,
            success: data.success,
            message_title: this.reflector.get<string>('message_title', context.getHandler()) || data.messageTitle,
            message: this.reflector.get<string>('response_message', context.getHandler()) || data.message,
            data: data.result
        }))
      );
  }
}

