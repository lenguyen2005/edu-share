import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { DomainException } from 'src/common/domain/exceptions/domain.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let code = 'INTERNAL_SERVER_ERROR';
    let message = 'Đã có lỗi hệ thống xảy ra. Vui lòng thử lại sau.';

    if (exception instanceof DomainException) {
      status = exception.statusCode;
      code = exception.code || 'DOMAIN_ERROR';
      message = exception.message;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null) {
        const resBody = res as {
          message?: string | string[];
          error?: string;
        };

        if (Array.isArray(resBody.message)) {
          message = resBody.message[0];
        } else {
          message = resBody.message ?? exception.message;
        }
        code = resBody.error
          ? resBody.error.toUpperCase().replace(/\s+/g, '_')
          : 'HTTP_ERROR';
      }
    } else {
      console.error('System Error:', exception);
    }

    response.status(status).json({
      success: false,
      error: {
        code,
        message,
      },
      timestamp: new Date().toISOString(),
    });
  }
}
