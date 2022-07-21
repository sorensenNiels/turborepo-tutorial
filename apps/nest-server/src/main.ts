import type { ValidationError } from '@nestjs/common';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { ExpressAdapter } from '@nestjs/platform-express';
import {
  ProblemDetailsExceptionFilter,
  ValidationErrorException
} from '@packages/nest-problem-details';
import express from 'express';
import { AppModule } from './app.module';
import { RequestLoggerInterceptor } from './interceptors/request-logger.interceptor';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    {
      cors: false,
      bodyParser: false
    }
  );

  // app.use(cookieParser());
  app.use(express.urlencoded({ extended: true, limit: 4096 }));
  app.use(express.json({ limit: 4096 }));
  app.use(
    express.text({
      type: [
        'text/plain',
        'application/xml',
        'text/xml',
        'application/soap+xml'
      ]
    })
  );

  const reflector = app.get(Reflector);

  // Setup global filters
  app.useGlobalFilters(
    new ProblemDetailsExceptionFilter('https://www.nodesoft.dk/problems/')
  );

  app.useGlobalInterceptors(
    new RequestLoggerInterceptor(),
    new ClassSerializerInterceptor(reflector)
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      dismissDefaultMessages: false,
      validationError: {
        target: false
      },
      exceptionFactory: (
        errors: ValidationError[]
      ): ValidationErrorException => {
        return new ValidationErrorException(errors);
      }
    })
  );

  await app.listen(5000);
}

bootstrap();
