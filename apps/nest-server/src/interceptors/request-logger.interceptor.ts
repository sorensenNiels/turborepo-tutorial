import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RequestLoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(RequestLoggerInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    this.logger.log('Request received');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.log({ now }, 'Request processed - timeTaken %s', 10)
        )
      );
  }
}
