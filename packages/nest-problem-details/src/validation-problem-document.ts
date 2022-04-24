import { HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import _ from 'lodash';
import { ErrorDetail } from './interfaces';
import { ProblemDocument } from './problem-document';

const validationDocumentProperties = {
  type: 'validationerror',
  title: 'One or more validation errors occured.',
  status: HttpStatus.BAD_REQUEST
};

export class ValidationProblemDocument extends ProblemDocument {
  static fromErrorDetail(
    errorDetail: ErrorDetail | ErrorDetail[]
  ): ValidationProblemDocument {
    return new ValidationProblemDocument(validationDocumentProperties, {
      errors: _.toArray(errorDetail)
    });
  }

  static fromValidationError(
    validationError: ValidationError | ValidationError[]
  ): ValidationProblemDocument {
    const errors: ErrorDetail[] = [];

    _.forEach(_.castArray(validationError), err => {
      _.forEach(err.constraints, (v: string, k: string) => {
        errors.push({
          code: k,
          message: v,
          property: err.property
        });
      });
    });

    return new ValidationProblemDocument(validationDocumentProperties, {
      errors
    });
  }
}
