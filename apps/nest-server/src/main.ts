import {
  ClassSerializerInterceptor,
  ValidationError,
  ValidationPipe
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication
} from '@nestjs/platform-express';
import {
  ProblemDetailsExceptionFilter,
  ValidationErrorException
} from '@packages/nest-problem-details';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    {
      cors: false,
      bodyParser: false
    }
  );

  const reflector = app.get(Reflector);

  // Setup global filters
  app.useGlobalFilters(
    new ProblemDetailsExceptionFilter('https://www.nodesoft.dk/problems/')
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      dismissDefaultMessages: false,
      validationError: {
        target: false
      },
      exceptionFactory: (errors: ValidationError[]) => {
        return new ValidationErrorException(errors);
      }
    })
  );

  await app.listen(5000);
}

bootstrap();
