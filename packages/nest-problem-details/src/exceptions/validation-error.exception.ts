import { HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import _ from 'lodash';
import { ErrorDetail } from '../interfaces';
import { ValidationProblemDocument } from '../validation-problem-document';
import { HttpBaseException } from './http-base.exception';

export class ValidationErrorException extends HttpBaseException {
  constructor(
    errors: ValidationError | ValidationError[] | ErrorDetail | ErrorDetail[]
  ) {
    const status = HttpStatus.BAD_REQUEST;
    let problemDocument: ValidationProblemDocument;

    const errorArr = _.castArray(errors);

    if (errorArr[0] instanceof ValidationError) {
      problemDocument = ValidationProblemDocument.fromValidationError(
        errorArr as ValidationError[]
      );
    } else {
      problemDocument = ValidationProblemDocument.fromErrorDetail(
        errorArr as ErrorDetail[]
      );
    }

    super(problemDocument, status);
  }
}
