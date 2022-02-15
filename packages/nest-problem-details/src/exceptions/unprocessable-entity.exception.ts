import { HttpStatus } from '@nestjs/common';
import { JsonObject } from 'type-fest';
import { ProblemDocument } from '../problem-document';
import { HttpBaseException } from './http-base.exception';

export class UnprocessableEntityException extends HttpBaseException {
  constructor(extras?: JsonObject) {
    const status = HttpStatus.UNPROCESSABLE_ENTITY;

    const problemDocument = ProblemDocument.create(
      {
        status
      },
      { ...extras }
    );

    super(problemDocument, status);
  }
}
