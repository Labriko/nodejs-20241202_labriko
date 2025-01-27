import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from 'express';
import { openSync, appendFileSync, existsSync, writeFileSync } from 'fs';

export class HttpErrorFilter implements ExceptionFilter {
  private readonly logFile = 'errors.log';

  constructor() {
    if (!existsSync(this.logFile)) {
      try {
        writeFileSync(this.logFile, '', 'utf8');
      } catch (e) {
        console.error(`Failed to initialize log file: ${e.message}`);
      }
    }
  }

  catch(exception: Error | HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception instanceof HttpException
        ? exception.getStatus()
        : 500;

    const logMessage = `[${new Date().toISOString()}] ${status} - ${exception.message}\n`;

    try {
      openSync(this.logFile, 'a');
      appendFileSync('errors.log', logMessage);
    } catch (e) {
      console.error(e.message);
    }

    response
      .status(status)
      .json({
        statusCode: status,
        message: exception.message,
        timestamp: new Date().toISOString(),
      });
  }
}
