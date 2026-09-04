// rpc-exception.filter.ts (in your Gateway)
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class RpcToHttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Check if error comes from microservice (custom object or RpcException)
    const errorResponse = typeof exception === 'object' && exception !== null
      ? exception
      : { message: exception };

    const status = errorResponse.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = errorResponse.message || 'Internal server error';
    const error = errorResponse.error || 'Bad Request';

    response.status(status).json({
      statusCode: status,
      message: message,
      error: error,
      timestamp: new Date().toISOString(),
    });
  }
}