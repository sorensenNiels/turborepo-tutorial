import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import responseTime from 'response-time';

@Injectable()
export class ResponseTimeMiddleware implements NestMiddleware {
  public static configure(opts: responseTime.ResponseTimeOptions): void {
    this.options = opts;
  }

  private static options: responseTime.ResponseTimeOptions;

  public use(req: Request, res: Response, next: NextFunction): void {
    if (ResponseTimeMiddleware.options) {
      responseTime(ResponseTimeMiddleware.options)(req, res, next);
    } else {
      responseTime()(req, res, next);
    }
  }
}
