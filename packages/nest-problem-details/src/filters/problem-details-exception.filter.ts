import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject
} from '@nestjs/common';
import { Response } from 'express';
import {
  BASE_PROBLEMS_URI_KEY,
  defaultHttpErrors as _defaultHttpErrors,
  HTTP_ERRORS_MAP_KEY
} from '../constants';
import { ProblemDocument } from '../problem-document';

export const PROBLEM_CONTENT_TYPE = 'application/problem+json';

@Catch()
export class ProblemDetailsExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(BASE_PROBLEMS_URI_KEY) private baseUri = '',
    @Inject(HTTP_ERRORS_MAP_KEY) private defaultHttpErrors = _defaultHttpErrors
  ) {}

  catch(exception: Error | HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const problemDocument = ProblemDocument.from(exception);
    const resObj = problemDocument.createResponse();

    response
      .type(PROBLEM_CONTENT_TYPE)
      .status(resObj.status)
      .json({
        success: false,
        ...resObj,
        type: [this.baseUri, resObj.type].filter(Boolean).join('/')
      });
  }
}
