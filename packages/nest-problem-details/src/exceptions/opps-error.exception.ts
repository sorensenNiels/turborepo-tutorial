import { HttpStatus } from '@nestjs/common';
import { JsonObject } from 'type-fest';
import { ErrorDetail } from '../interfaces';
import { ProblemDocument } from '../problem-document';
import { HttpBaseException } from './http-base.exception';

export class OopsError extends HttpBaseException {
  constructor(
    errors: string | ErrorDetail | ErrorDetail[],
    extras?: JsonObject
  ) {
    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    let detail;
    let errorDetails: ErrorDetail | ErrorDetail[] = [];

    if (typeof errors === 'string') {
      detail = errors;
    } else {
      errorDetails = errors;
    }

    const problemDocument = ProblemDocument.create(
      {
        status,
        type: 'oops_error',
        detail
      },
      { errorDetails, ...extras }
    );

    super(problemDocument, status);

    problemDocument.logError();
  }
}
