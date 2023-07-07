/*
https://docs.nestjs.com/exception-filters#exception-filters-1
*/

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ENV_PRODUCTION } from '../constants';
import { HttpStatusCodeToString } from '../enum/http-status.enum';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    let title = exception instanceof Error ? exception ? exception.getResponse()['error'] ||  exception['message'] : '' : 'Internal server error'
    
    let err = {}
    if (exception.getResponse()['message']) {
      err = exception.getResponse()['message'];
    } else {
      err = exception.cause['cause']
    }

    let message = ""
    if (exception.cause) {
      message = exception.cause.message
    } else {
      message = exception.message
    }
    
    if (title == message) {
      title = HttpStatusCodeToString(status)
    }
    
    response.status(status).json({
      success: false,
      status_code: status,
      message_title: title,
      message,
      error: process.env.ENV != ENV_PRODUCTION ? err : null
    });
  }  
}
